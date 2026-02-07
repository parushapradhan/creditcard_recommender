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

const SKIP_WORDS = new Set([
  'valid', 'thru', 'until', 'card', 'holder', 'visa', 'mastercard', 'amex', 'discover',
  'debit', 'credit', 'bank', 'number', 'expires', 'expiry', 'valid thru', 'valid until',
]);

function parseCardText(text: string): Partial<ScannedCardData> {
  const out: Partial<ScannedCardData> = {};
  const rawLines = text.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  const lines = rawLines.map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);

  // Card number: take longest sequence of 13–19 digits (handles OCR spaces/dashes)
  const digitLine = text.replace(/\s/g, '').replace(/-/g, '');
  const numberMatch = digitLine.match(/\d{13,19}/);
  if (numberMatch) {
    const raw = numberMatch[0];
    const grouped = raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    out.number = grouped.length > 4 ? grouped : raw;
  }

  // Expiry: multiple patterns (MM/YY, MM-YY, MM YY, "VALID THRU 10/30", etc.)
  const expiryPatterns = [
    /(?:valid\s*thru|valid\s*until|expires?|expiry)\s*[:\s]*(\d{1,2})\s*[\/\-]\s*(\d{2,4})/i,
    /(\d{1,2})\s*[\/\-]\s*(\d{2,4})/,
    /(\d{1,2})\s+(\d{2,4})/,
  ];
  for (const re of expiryPatterns) {
    const m = text.match(re);
    if (m) {
      let month = m[1].padStart(2, '0');
      let year = m[2];
      if (year.length === 4) year = year.slice(-2);
      const monthNum = parseInt(month, 10);
      if (monthNum >= 1 && monthNum <= 12) {
        out.validUntil = `${month} / ${year}`;
        break;
      }
    }
  }

  // Cardholder name: longest line that is mostly letters, not a skip word, 2+ chars
  let bestName = '';
  for (const line of lines) {
    const clean = line.replace(/\s+/g, ' ').trim();
    if (clean.length < 2) continue;
    const lower = clean.toLowerCase();
    if (SKIP_WORDS.has(lower) || SKIP_WORDS.has(clean.split(/\s+/)[0]?.toLowerCase() ?? '')) continue;
    const letterCount = (clean.match(/[A-Za-z]/g) || []).length;
    const otherCount = (clean.match(/[\s\-'.]/g) || []).length;
    const digitCount = (clean.match(/\d/g) || []).length;
    if (digitCount > letterCount) continue;
    if (letterCount < clean.length * 0.5) continue;
    if (!/^[\w\s\-'.]+$/.test(clean)) continue;
    if (clean.length > bestName.length) bestName = clean;
  }
  if (bestName) out.cardHolder = bestName.toUpperCase().replace(/\s+/g, ' ');

  return out;
}

function isValidCardNumber(num: string): boolean {
  const digits = num.replace(/\s/g, '');
  return digits.length >= 13 && digits.length <= 19 && /^\d+$/.test(digits);
}

const SCAN_INTERVAL_MS = 2000;
const LOG = (msg: string, ...args: unknown[]) => console.log('[ScanCard]', msg, ...args);

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
  const [streamReady, setStreamReady] = useState(false);

  const stopCamera = () => {
    LOG('stopCamera called');
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
    LOG('effect(open): open=', open);
    if (!open) {
      setStreamReady(false);
      stopCamera();
      workerRef.current?.terminate().catch(() => {});
      workerRef.current = null;
      setStatus('camera');
      setErrorMessage('');
      return;
    }

    let mounted = true;
    setStatus('camera');
    setStreamReady(false);
    LOG('requesting camera (facingMode: environment)...');

    const initCamera = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
        .then((stream) => {
          LOG('getUserMedia success, tracks=', stream.getTracks().length);
          if (!mounted || !videoRef.current) {
            LOG('unmounted or no videoRef, stopping stream');
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          streamRef.current = stream;
          const video = videoRef.current;
          video.srcObject = stream;
          video
            .play()
            .then(() => {
              LOG('video.play() resolved');
              if (mounted) setStreamReady(true);
            })
            .catch((e) => LOG('video.play() failed', e));
        })
        .catch((err) => {
          LOG('getUserMedia failed', err?.name, err?.message, err);
          if (mounted) {
            setStatus('error');
            setErrorMessage('Camera access denied or unavailable.');
          }
        });
    };

    initCamera();

    return () => {
      mounted = false;
      setStreamReady(false);
      stopCamera();
    };
  }, [open]);

  useEffect(() => {
    LOG('effect(scan): open=', open, 'status=', status, 'streamReady=', streamReady);
    if (!open) return;
    if (status !== 'camera') {
      LOG('effect(scan): skipping (status is not camera)');
      return;
    }
    if (!streamReady) {
      LOG('effect(scan): skipping (stream not ready yet)');
      return;
    }

    const video = videoRef.current;
    if (!video) {
      LOG('no video element, skipping scan setup');
      return;
    }
    LOG('video element present, starting scan setup; readyState=', video.readyState, 'videoWidth=', video.videoWidth, 'videoHeight=', video.videoHeight);

    const startAutoScan = () => {
      if (intervalRef.current) {
        LOG('startAutoScan: interval already running');
        return;
      }
      LOG('startAutoScan: starting interval', SCAN_INTERVAL_MS, 'ms');

      runOneScan.current = async () => {
        if (scanningRef.current) {
          LOG('runOneScan: skip (already scanning)');
          return;
        }
        if (!streamRef.current || !videoRef.current) {
          LOG('runOneScan: skip (no stream or video)');
          return;
        }
        const v = videoRef.current;
        if (v.readyState < 2) {
          LOG('runOneScan: skip (video not ready, readyState=', v.readyState, ')');
          return;
        }
        const track = streamRef.current.getVideoTracks()[0];
        const settings = track?.getSettings?.();
        const w = v.videoWidth || settings?.width || 640;
        const h = v.videoHeight || settings?.height || 480;
        LOG('runOneScan: frame size', w, 'x', h, 'videoWidth=', v.videoWidth, 'videoHeight=', v.videoHeight, 'settings=', settings);
        if (w < 100 || h < 100) {
          LOG('runOneScan: skip (dimensions too small)');
          return;
        }

        scanningRef.current = true;
        setStatus('processing');
        const scale = 1.0;
        const captureW = Math.floor(w * scale);
        const captureH = Math.floor(h * scale);
        const capture = document.createElement('canvas');
        capture.width = captureW;
        capture.height = captureH;
        const captureCtx = capture.getContext('2d');
        if (!captureCtx) {
          LOG('runOneScan: no canvas 2d context');
          setStatus('camera');
          scanningRef.current = false;
          return;
        }
        captureCtx.drawImage(v, 0, 0, captureW, captureH);
        const preprocess = document.createElement('canvas');
        preprocess.width = captureW;
        preprocess.height = captureH;
        const preCtx = preprocess.getContext('2d');
        const runOcr = (blob: Blob) => {
          (async () => {
            if (!open) {
              setStatus('camera');
              scanningRef.current = false;
              return;
            }
            LOG('toBlob: blob size', blob.size, 'bytes');
            try {
              let worker = workerRef.current;
              if (!worker) {
                LOG('Loading tesseract.js...');
                const Tesseract = await import('tesseract.js').then((m) => m.default ?? m);
                LOG('tesseract.js loaded, creating worker(eng)...');
                worker = await Tesseract.createWorker('eng');
                workerRef.current = worker;
                try {
                  await worker.setParameters({ tessedit_pageseg_mode: 6 });
                } catch (_) {}
                LOG('Tesseract worker created');
              }
              LOG('worker.recognize() started');
              const { data } = await worker.recognize(blob);
              const rawText = data.text || '';
              const confidence = (data as { confidence?: number }).confidence;
              LOG('OCR result: confidence=', confidence, 'text length=', rawText.length, 'preview=', JSON.stringify(rawText.slice(0, 200)));
              const parsed = parseCardText(rawText);
              LOG('parsed:', parsed);
              if (parsed.number && isValidCardNumber(parsed.number)) {
                LOG('Valid card number found, closing and calling onScanned');
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
              LOG('No valid card number in this frame (parsed.number=', parsed.number, 'valid=', parsed.number ? isValidCardNumber(parsed.number) : false, ')');
            } catch (err) {
              LOG('OCR error', err);
              console.error('[ScanCard] OCR catch', err);
              if (!workerRef.current) {
                setStatus('error');
                setErrorMessage('Scan engine failed to load. Use "Add card details" to enter manually.');
                stopCamera();
                return;
              }
            }
            setStatus('camera');
            scanningRef.current = false;
          })();
        };
        if (!preCtx) {
          capture.toBlob((blob) => {
            if (!blob || !open) {
              LOG('toBlob callback: no blob or dialog closed', !!blob, open);
              setStatus('camera');
              scanningRef.current = false;
              return;
            }
            runOcr(blob);
          }, 'image/jpeg', 0.9);
          return;
        }
        preCtx.filter = 'contrast(1.35) grayscale(1)';
        preCtx.drawImage(capture, 0, 0);
        LOG('runOneScan: capturing frame (preprocessed)', captureW, 'x', captureH);
        preprocess.toBlob(
          (blob) => {
            if (!blob || !open) {
              LOG('toBlob callback: no blob or dialog closed', !!blob, open);
              setStatus('camera');
              scanningRef.current = false;
              return;
            }
            runOcr(blob);
          },
          'image/jpeg',
          0.9
        );
      };

      intervalRef.current = setInterval(() => {
        runOneScan.current();
      }, SCAN_INTERVAL_MS);
      runOneScan.current();
    };

    const onCanPlay = () => {
      LOG('video canplay');
      startAutoScan();
    };
    const onLoadedData = () => {
      LOG('video loadeddata');
      startAutoScan();
    };
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('loadeddata', onLoadedData);
    if (video.readyState >= 2) {
      LOG('video already readyState >= 2, startAutoScan now');
      startAutoScan();
    }

    const fallbackTimer = setTimeout(() => {
      LOG('fallback 1.5s timer: startAutoScan');
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
  }, [open, streamReady, onScanned, onClose]);

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
