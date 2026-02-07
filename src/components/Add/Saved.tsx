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
      border: 1,
      borderColor: 'divider',
      borderRadius: 2,
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: 2,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CreditCardIcon />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2">HSBC BANK UK.</Typography>
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
