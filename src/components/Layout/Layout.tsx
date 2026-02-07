import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../Header/Header';

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 3 }}>
    <Container maxWidth="sm">
      <Header />
      <Box component="main" sx={{ pt: 2 }}>
        {children}
      </Box>
    </Container>
  </Box>
);

export default Layout;
