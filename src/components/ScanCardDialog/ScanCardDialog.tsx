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

  const digitLine = text.replace(/\s/g, '');
  const numberMatch = digitLine.match(/\d{13,19}/);
  if (numberMatch) {
    const raw = numberMatch[0];
    const grouped = raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    out.number = grouped.length > 4 ? grouped : raw;
  }

  const expiryMatch = text.match(/(\d{1,2})\s*\/?\s*(\d{2,4})/);
  if (expiryMatch) {
    let month = expiryMatch[1].padStart(2, '0');
    let year = expiryMatch[2];
    if (year.length === 4) year = year.slice(-2);
    out.validUntil = `${month} / ${year}`;
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (/^[A-Za-z\s\.\-']+$/.test(line) && line.length > 2 && !/^\d+$/.test(line)) {
      out.cardHolder = line.toUpperCase();
      break;
    }
  }

  return out;
}

function isValidCardNumber(num: string): boolean {
  const digits = num.replace(/\s/g, '');
  return digits.length >= 13 && digits.length <= 19 && /^\d+$/.test(digits);
}

const SCAN_INTERVAL_MS = 2000;

interface ScanCardDialogProps {
  open: boolean;
  onClose: () => void;
  onScanned: (data: ScannedCardData) => void;
}

const ScanCardDialog: React.FC<ScanCardDialogProps> = ({ open, onClose, onScanned }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const workerRef = useRef<{ terminate: () => Promise<void>; recognize: (blob: Blob) => Promise<{ data: { text: string } }> } | null>(null);
  const scanningRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [status, setStatus] = useState<'camera' | 'processing' | 'error'>('camera');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    scanningRef.current = false;
  };

  const runOneScan = useRef<() => Promise<void>>(async () => {});

  useEffect(() => {
    if (!open) {
      stopCamera();
      workerRef.current?.terminate().catch(() => {});
      workerRef.current = null;
      setStatus('camera');
      setErrorMessage('');
      return;
    }

    let mounted = true;
    setStatus('camera');

    const initCamera = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
        .then((stream) => {
          if (!mounted || !videoRef.current) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          streamRef.current = stream;
          const video = videoRef.current;
          video.srcObject = stream;
          video.play().catch(() => {});
        })
        .catch(() => {
          if (mounted) {
            setStatus('error');
            setErrorMessage('Camera access denied or unavailable.');
          }
        });
    };

    initCamera();

    return () => {
      mounted = false;
      stopCamera();
    };
  }, [open]);

  useEffect(() => {
    if (!open || status !== 'camera') return;

    const video = videoRef.current;
    if (!video) return;

    const startAutoScan = () => {
      if (intervalRef.current) return;

      runOneScan.current = async () => {
        if (scanningRef.current || !streamRef.current || !videoRef.current) return;
        const v = videoRef.current;
        if (v.readyState < 2) return;
        const track = streamRef.current.getVideoTracks()[0];
        const settings = track?.getSettings?.();
        const w = v.videoWidth || settings?.width || 640;
        const h = v.videoHeight || settings?.height || 480;
        if (w < 100 || h < 100) return;

        scanningRef.current = true;
        setStatus('processing');
        const canvas = document.createElement('canvas');
        const scale = 0.6;
        canvas.width = Math.floor(w * scale);
        canvas.height = Math.floor(h * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setStatus('camera');
          scanningRef.current = false;
          return;
        }
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          async (blob) => {
            if (!blob || !open) {
              setStatus('camera');
              scanningRef.current = false;
              return;
            }
            try {
              let worker = workerRef.current;
              if (!worker) {
                const Tesseract = await import('tesseract.js').then((m) => m.default ?? m);
                worker = await Tesseract.createWorker('eng');
                workerRef.current = worker;
              }
              const { data } = await worker.recognize(blob);
              const parsed = parseCardText(data.text || '');
              if (parsed.number && isValidCardNumber(parsed.number)) {
                stopCamera();
                await workerRef.current?.terminate();
                workerRef.current = null;
                onScanned({
                  number: parsed.number,
                  validUntil: parsed.validUntil ?? '-- / --',
                  cardHolder: parsed.cardHolder ?? 'CARDHOLDER',
                  cvcNumber: '***',
                });
                onClose();
                return;
              }
            } catch (err) {
              if (!workerRef.current) {
                setStatus('error');
                setErrorMessage('Scan engine failed to load. Use "Add card details" to enter manually.');
                stopCamera();
                return;
              }
            }
            setStatus('camera');
            scanningRef.current = false;
          },
          'image/jpeg',
          0.85
        );
      };

      intervalRef.current = setInterval(() => {
        runOneScan.current();
      }, SCAN_INTERVAL_MS);
      runOneScan.current();
    };

    const onCanPlay = () => startAutoScan();
    const onLoadedData = () => startAutoScan();
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('loadeddata', onLoadedData);
    if (video.readyState >= 2) startAutoScan();

    const fallbackTimer = setTimeout(() => {
      startAutoScan();
    }, 1500);

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('loadeddata', onLoadedData);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [open, onScanned, onClose]);

  const handleClose = () => {
    stopCamera();
    workerRef.current?.terminate().catch(() => {});
    workerRef.current = null;
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
        {(status === 'camera' || status === 'processing') && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/10',
              bgcolor: 'rgba(0,0,0,0.4)',
              borderRadius: 3,
              border: '1px solid rgba(255,255,255,0.08)',
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
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                py: 1.5,
                textAlign: 'center',
                bgcolor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(8px)',
                color: 'white',
              }}
            >
              <Typography variant="body2">
                {status === 'processing' ? 'Reading card...' : 'Auto-scanning... Hold your card in the frame'}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {status === 'error' && (
          <Button
            variant="contained"
            onClick={() => {
              stopCamera();
              setStatus('camera');
              setErrorMessage('');
              navigator.mediaDevices
                .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
                .then((stream) => {
                  if (videoRef.current) {
                    streamRef.current = stream;
                    videoRef.current.srcObject = stream;
                  }
                })
                .catch(() => setErrorMessage('Camera access denied or unavailable.'));
            }}
          >
            Try again
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ScanCardDialog;
