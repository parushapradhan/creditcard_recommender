import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './navigation/Navigation';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' },
    secondary: { main: '#b0b0b0' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
    divider: '#333333',
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 600, fontSize: '1.25rem' },
    h6: { fontWeight: 600, fontSize: '1.125rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100dvh',
          WebkitTapHighlightColor: 'transparent',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid #333',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, minHeight: 48, fontSize: '1rem' },
        contained: {
          backgroundColor: '#fff',
          color: '#121212',
          '&:hover': { backgroundColor: '#e0e0e0' },
        },
        outlined: {
          borderColor: '#666',
          color: '#fff',
          '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#2a2a2a',
            '& fieldset': { borderColor: '#444' },
            '&:hover fieldset': { borderColor: '#888' },
            '&.Mui-focused fieldset': { borderWidth: 2, borderColor: '#fff' },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          minWidth: 48,
          minHeight: 48,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          color: '#fff',
          boxShadow: 'none',
          borderBottom: '1px solid #333',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Navigation />
  </ThemeProvider>
);

export default App;
