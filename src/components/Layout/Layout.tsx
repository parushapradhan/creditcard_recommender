import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BottomNav from '../BottomNav/BottomNav';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => (
  <Box
    sx={{
      minHeight: '100dvh',
      minHeight: '100vh',
      bgcolor: 'background.default',
      px: 0,
      pt: 0,
    }}
  >
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        px: 'max(16px, env(safe-area-inset-left))',
        pr: 'max(16px, env(safe-area-inset-right))',
        minHeight: '100dvh',
        minHeight: '100vh',
        pb: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      <Box component="main" sx={{ pt: 2, pb: 10 }}>
        {children}
      </Box>
    </Container>
    <BottomNav />
  </Box>
);

export default Layout;
