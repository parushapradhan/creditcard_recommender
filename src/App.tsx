import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './navigation/Navigation';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#000000' },
    secondary: { main: '#000000' },
    background: { default: '#fafafa', paper: '#ffffff' },
    text: { primary: '#000000', secondary: '#616161' },
    divider: '#e0e0e0',
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
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, minHeight: 48, fontSize: '1rem' },
        contained: {
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': { backgroundColor: '#333' },
        },
        outlined: {
          borderColor: '#000',
          color: '#000',
          '&:hover': { borderColor: '#000', backgroundColor: 'rgba(0,0,0,0.04)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#fff',
            '& fieldset': { borderColor: '#e0e0e0' },
            '&:hover fieldset': { borderColor: '#000' },
            '&.Mui-focused fieldset': { borderWidth: 2, borderColor: '#000' },
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
          backgroundColor: '#000',
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
