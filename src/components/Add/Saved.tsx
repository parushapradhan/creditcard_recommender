import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Saved: React.FC = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      p: 2,
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 3,
      bgcolor: 'rgba(255,255,255,0.06)',
      boxShadow: '0 8px 32px -8px rgba(0,0,0,0.25)',
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: 2,
        background: 'linear-gradient(to right, #6366f1, #a855f7)',
        color: '#fff',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CreditCardIcon />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" color="text.primary">HSBC BANK UK.</Typography>
      <Typography variant="caption" color="text.secondary">
        VISA - 9075
      </Typography>
    </Box>
    <Button size="small" variant="outlined">
      Change
    </Button>
  </Box>
);

export default Saved;
