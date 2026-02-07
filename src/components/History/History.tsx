import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryLine from './HistoryLine';

interface IProps {
  date?: string;
  detailed?: boolean;
  dateBalance?: string;
}

const historyItems = [
  { id: 1, icon: 'coffee', time: '15:34', name: 'Coffee', amount: 3.25, color: 'gray', currencySymbol: '€' },
  { id: 2, icon: 'hotel', time: '12:21', name: 'Hotel booking', amount: 323.26, color: 'gray', currencySymbol: '€' },
  { id: 3, icon: 'sync', time: '11:46', name: 'Subscription payment', amount: 9.99, color: 'gray', currencySymbol: '€' },
  { id: 4, icon: 'water', time: '10:51', name: 'Water bill', amount: 54.21, color: 'gray', currencySymbol: '€' },
  { id: 5, icon: 'water', time: '09:14', name: 'Supermarket', amount: 78.12, color: 'gray', currencySymbol: '€' },
  { id: 6, icon: 'local_activity', time: '09:14', name: 'Tickets', amount: 78.12, color: 'gray', currencySymbol: '€' },
  { id: 7, icon: 'bolt', time: '07:33', name: 'Electricity bill', amount: 43.55, color: 'gray', currencySymbol: '€' },
];

const History: React.FC<IProps> = ({ date, detailed = false, dateBalance }) => (
  <Paper variant="outlined" sx={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px -8px rgba(0,0,0,0.25)' }}>
    {detailed && date && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, bgcolor: 'rgba(255,255,255,0.05)' }}>
        <Typography variant="body2" color="text.secondary">{date}</Typography>
        <Typography variant="body2" color="text.secondary">{dateBalance}</Typography>
      </Box>
    )}
    <Box>
      {historyItems.map((item) => (
        <HistoryLine key={item.id} item={item} />
      ))}
    </Box>
    {!detailed && (
      <Button
        component={RouterLink}
        to="/transactions"
        fullWidth
        endIcon={<ChevronRightIcon />}
        sx={{ justifyContent: 'center', py: 1.5 }}
      >
        See all
      </Button>
    )}
  </Paper>
);

export default History;
