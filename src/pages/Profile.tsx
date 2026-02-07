import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Layout from '../components/Layout/Layout';
import Divider from '../components/Divider/Divider';
import SupportIcon from '@mui/icons-material/Support';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SchoolIcon from '@mui/icons-material/School';
import InboxIcon from '@mui/icons-material/Inbox';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ContrastIcon from '@mui/icons-material/Contrast';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const profileLinks1 = [
  { icon: <SupportIcon />, label: 'Help' },
  { icon: <AccountCircleIcon />, label: 'Account' },
  { icon: <SchoolIcon />, label: 'Learn' },
  { icon: <InboxIcon />, label: 'Inbox', badge: 4 },
];
const profileLinks2 = [
  { icon: <VerifiedUserIcon />, label: 'Security & privacy' },
  { icon: <NotificationsIcon />, label: 'Notification settings' },
  { icon: <ContrastIcon />, label: 'Appearance' },
  { icon: <StarIcon />, label: 'New features' },
];
const profileLinks3 = [
  { icon: <InfoIcon />, label: 'About us' },
  { icon: <PowerSettingsNewIcon />, label: 'Sign out' },
];

const Profile: React.FC = () => (
  <Layout>
    <Divider />
    <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
      Profile
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
      <Avatar
        src="/images/profile.jpg"
        sx={{ width: 80, height: 80, mb: 1 }}
      />
      <Typography variant="h6">Cenk SARI</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          @cenksari
        </Typography>
        <QrCode2Icon fontSize="small" color="action" />
      </Box>
    </Box>
    <Divider />
    <List disablePadding>
      {profileLinks1.map(({ icon, label, badge }) => (
        <ListItem key={label} disablePadding>
          <ListItemButton component={RouterLink} to="/profile">
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
            {badge != null && (
              <Typography variant="caption" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', px: 1, borderRadius: 1 }}>
                {badge}
              </Typography>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List disablePadding>
      {profileLinks2.map(({ icon, label }) => (
        <ListItem key={label} disablePadding>
          <ListItemButton component={RouterLink} to="/profile">
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List disablePadding>
      {profileLinks3.map(({ icon, label }) => (
        <ListItem key={label} disablePadding>
          <ListItemButton component={RouterLink} to="/profile">
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Typography variant="caption" color="text.secondary" align="center" display="block">
      v.1.0.12
      <br />
      Banking Ltd.
    </Typography>
    <Divider />
  </Layout>
);

export default Profile;
