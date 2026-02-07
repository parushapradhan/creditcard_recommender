import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { value: '/cards', label: 'Cards', icon: <CreditCardIcon /> },
  { value: '/transactions', label: 'Transactions', icon: <ReceiptLongIcon /> },
  { value: '/profile', label: 'Settings', icon: <SettingsIcon /> },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const current = navItems.some((item) => location.pathname === item.value)
    ? location.pathname
    : '';

  return (
    <BottomNavigation
      value={current}
      onChange={(_, value) => navigate(value)}
      showLabels
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        pb: 'env(safe-area-inset-bottom)',
        pt: 1,
      }}
    >
      {navItems.map((item) => (
        <BottomNavigationAction
          key={item.value}
          value={item.value}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </BottomNavigation>
  );
};

export default BottomNav;
