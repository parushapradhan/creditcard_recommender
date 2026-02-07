import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const actionButtons = [
  { to: '/add', icon: <AddIcon />, label: 'Add money' },
  { to: '/home', icon: <SyncIcon />, label: 'Exchange' },
  { to: '/home', icon: <InfoOutlinedIcon />, label: 'Details' },
  { to: undefined, icon: <MoreHorizIcon />, label: 'More' },
];

const Actions: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap', py: 2 }}>
    {actionButtons.map(({ to, icon, label }) => (
      <Box key={label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IconButton
          component={to ? RouterLink : 'button'}
          to={to}
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: 56,
            height: 56,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          {icon}
        </IconButton>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
          {label}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default Actions;
