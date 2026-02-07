import { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Header: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar sx={{ gap: 1 }}>
        <IconButton component={RouterLink} to="/profile" color="inherit" sx={{ p: 0 }}>
          <Avatar
            src="/images/profile.jpg"
            alt="Profile"
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
        <Box
          onClick={() => inputRef.current?.focus()}
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(255,255,255,0.15)',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
          }}
        >
          <SearchIcon sx={{ mr: 0.5, color: 'inherit' }} />
          <InputBase
            inputRef={inputRef}
            placeholder="Search"
            name="search"
            id="search"
            sx={{ color: 'inherit', '& .MuiInputBase-input::placeholder': { opacity: 1 } }}
          />
        </Box>
        <IconButton component={RouterLink} to="/transactions" color="inherit">
          <EqualizerIcon />
        </IconButton>
        <IconButton component={RouterLink} to="/cards" color="inherit">
          <CreditCardIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
