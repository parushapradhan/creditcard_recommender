import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
  balance: number;
  currency: string;
  currencySymbol: string;
}

const Balance: React.FC<IProps> = ({ balance, currency, currencySymbol }) => (
  <Paper
    variant="outlined"
    className="frosted-blur"
    sx={{
      p: 3,
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 8px 32px -8px rgba(0,0,0,0.25)',
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, opacity: 0.7 }}
    >
      Main - {currency}
      <ExpandMoreIcon fontSize="small" />
    </Typography>
    <Typography
      variant="h4"
      fontWeight="bold"
      color="text.primary"
      className="font-numeric"
      sx={{ mt: 1, letterSpacing: '-0.02em', fontSize: 'clamp(1.75rem, 5vw, 2.25rem)' }}
    >
      {currencySymbol}{balance.toLocaleString()}
    </Typography>
  </Paper>
);

export default Balance;
