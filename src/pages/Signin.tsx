import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home', { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fafafa',
        p: 2,
      }}
    >
      <Paper elevation={0} sx={{ p: 3, maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Hello! 👋
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Please sign in to your account or sign up a new account.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Link component={RouterLink} to="/" variant="body2" color="text.secondary">
              Forgot password?
            </Link>
          </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign in
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link component={RouterLink} to="/" color="text.primary" fontWeight={500}>
            Click here
          </Link>
          {' if you don\'t have an account'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signin;
