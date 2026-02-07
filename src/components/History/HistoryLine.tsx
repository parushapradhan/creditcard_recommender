import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Circle from '../Circle/Circle';

interface IData {
  id: number;
  icon: string;
  name: string;
  time: string;
  color: string;
  amount: number;
  currencySymbol: string;
}

interface IProps {
  item: IData;
}

const HistoryLine: React.FC<IProps> = ({ item }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      py: 1.5,
      px: 2,
      minHeight: 56,
      '&:not(:last-child)': { borderBottom: '1px solid rgba(255,255,255,0.08)' },
    }}
  >
    <Box sx={{ mr: 2 }}>
      <Circle color={item.color} icon={item.icon} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" color="text.primary">{item.name}</Typography>
      <Typography variant="caption" color="text.secondary">
        {item.time}
      </Typography>
    </Box>
    <Typography variant="body2" color="text.secondary">
      - {item.currencySymbol}{item.amount}
    </Typography>
  </Box>
);

export default HistoryLine;
