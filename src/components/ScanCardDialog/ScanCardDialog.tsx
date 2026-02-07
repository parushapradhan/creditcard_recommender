import { useRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export interface ScannedCardData {
  number: string;
  validUntil: string;
  cardHolder: string;
  cvcNumber: string;
}

function parseCardText(text: string): Partial<ScannedCardData> {
  const out: Partial<ScannedCardData> = {};
  const lines = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);

  // Card number: long digit string (possibly with spaces). 13–19 digits.
  const digitLine = text.replace(/\s/g, '');
  const numberMatch = digitLine.match(/\d{13,19}/);
  if (numberMatch) {
    const raw = numberMatch[0];
    const grouped = raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    out.number = grouped.length > 4 ? grouped : raw;
  }

  // Expiry: MM/YY or MM YY
  const expiryMatch = text.match(/(\d{1,2})\s*\/?\s*(\d{2,4})/);
  if (expiryMatch) {
    let month = expiryMatch[1].padStart(2, '0');
    let year = expiryMatch[2];
    if (year.length === 4) year = year.slice(-2);
    out.validUntil = `${month} / ${year}`;
  }

  // Cardholder: line that is mostly letters (and spaces), often last
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (/^[A-Za-z\s\.\-']+$/.test(line) && line.length > 2 && !/^\d+$/.test(line)) {
      out.cardHolder = line.toUpperCase();
      break;
    }
  }

  return out;
}

interface ScanCardDialogProps {
  open: boolean;
  onClose: () => void;
  onScanned: (data: ScannedCardData) => void;
}

const ScanCardDialog: React.FC<ScanCardDialogProps> = ({ open, onClose, onScanned }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<'camera' | 'captured' | 'processing' | 'error'>('camera');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  useEffect(() => {
    if (!open) {
      stopCamera();
      setStatus('camera');
      setErrorMessage('');
      return;
    }
    let mounted = true;
    setStatus('camera');
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((stream) => {
        if (!mounted || !videoRef.current) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        if (mounted) {
          setStatus('error');
          setErrorMessage('Camera access denied or unavailable.');
        }
      });
    return () => {
      mounted = false;
      stopCamera();
    };
  }, [open]);

  const handleCapture = async () => {
    const video = videoRef.current;
    if (!video || !streamRef.current) return;
    stopCamera();
    setStatus('processing');

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setStatus('error');
      setErrorMessage('Could not capture image.');
      return;
    }
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setStatus('error');
        setErrorMessage('Could not create image.');
        return;
      }
      try {
        const Tesseract = await import('tesseract.js').then((m) => m.default ?? m);
        const worker = await Tesseract.createWorker('eng');
        const { data } = await worker.recognize(blob);
        await worker.terminate();
        const parsed = parseCardText(data.text);
        const card: ScannedCardData = {
          number: parsed.number ?? '**** **** **** ****',
          validUntil: parsed.validUntil ?? '-- / --',
          cardHolder: parsed.cardHolder ?? 'CARDHOLDER',
          cvcNumber: '***',
        };
        onScanned(card);
        onClose();
      } catch {
        setStatus('error');
        setErrorMessage('Could not read card. Try again or add details manually.');
      }
    }, 'image/jpeg', 0.9);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Scan card</DialogTitle>
      <DialogContent>
        {status === 'error' && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
        {status === 'camera' && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/10',
              bgcolor: 'grey.900',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        )}
        {status === 'processing' && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, gap: 2 }}>
            <CircularProgress />
            <Typography>Reading card...</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {status === 'camera' && (
          <Button variant="contained" onClick={handleCapture}>
            Capture
          </Button>
        )}
        {status === 'error' && (
          <Button variant="contained" onClick={() => setStatus('camera')}>
            Try again
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ScanCardDialog;
