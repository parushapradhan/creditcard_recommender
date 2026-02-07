import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SavingsIcon from '@mui/icons-material/Savings';

const widgets = [
  { to: '/transactions', icon: <SyncAltIcon />, label: 'Transactions' },
  { to: '/cards', icon: <CreditCardIcon />, label: 'Cards' },
  { to: '/savings', icon: <SavingsIcon />, label: 'Savings' },
];

const Widgets: React.FC = () => (
  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexWrap: 'wrap' }}>
    {widgets.map(({ to, icon, label }) => (
      <Button
        key={label}
        component={RouterLink}
        to={to}
        variant="outlined"
        startIcon={icon}
        sx={{ flex: 1, minWidth: 100 }}
      >
        {label}
      </Button>
    ))}
  </Box>
);

export default Widgets;
