import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
  balance: number;
  currency: string;
  currencySymbol: string;
}

const Balance: React.FC<IProps> = ({ balance, currency, currencySymbol }) => (
  <Paper variant="outlined" sx={{ p: 3, textAlign: 'center' }}>
    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
      Main - {currency}
      <ExpandMoreIcon fontSize="small" />
    </Typography>
    <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
      {currencySymbol}{balance.toLocaleString()}
    </Typography>
  </Paper>
);

export default Balance;
