import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './navigation/Navigation';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#6366f1' },
    secondary: { main: 'rgba(255,255,255,0.65)' },
    background: { default: '#0f1012', paper: 'rgba(255,255,255,0.06)' },
    text: { primary: '#f4f4f5', secondary: 'rgba(244,244,245,0.65)' },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: {
    borderRadius: 24,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.02em' },
    h6: { fontWeight: 600, fontSize: '1.125rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shadows: [
    'none',
    '0 8px 32px -8px rgba(0,0,0,0.25)',
    '0 8px 32px -8px rgba(0,0,0,0.25)',
    '0 8px 32px -8px rgba(0,0,0,0.25)',
    '0 8px 32px -8px rgba(0,0,0,0.25)',
    ...Array(20).fill('0 8px 32px -8px rgba(0,0,0,0.25)'),
  ],
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
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.25)',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          minHeight: 48,
          fontSize: '1rem',
          transition: 'transform 200ms cubic-bezier(0.33,1,0.68,1), box-shadow 200ms, background-color 200ms',
        },
        contained: {
          background: 'linear-gradient(to right, #6366f1, #a855f7)',
          color: '#fff',
          boxShadow: '0 0 24px -4px rgba(99,102,241,0.4)',
          '&:hover': {
            background: 'linear-gradient(to right, #6366f1, #a855f7)',
            boxShadow: '0 0 32px -4px rgba(99,102,241,0.5)',
            filter: 'brightness(1.1)',
          },
          '&:active': { transform: 'scale(0.98)' },
        },
        outlined: {
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#f4f4f5',
          backgroundColor: 'rgba(255,255,255,0.05)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.15)',
            backgroundColor: 'rgba(255,255,255,0.08)',
          },
          '&:active': { transform: 'scale(0.98)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 24,
            backgroundColor: 'rgba(255,255,255,0.05)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&.Mui-focused fieldset': { borderWidth: 2, borderColor: 'rgba(99,102,241,0.5)' },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '50%',
          minWidth: 48,
          minHeight: 48,
          transition: 'transform 200ms cubic-bezier(0.33,1,0.68,1), background-color 200ms',
          '&:active': { transform: 'scale(0.98)' },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: { borderRadius: 24 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15,16,18,0.95)',
          color: '#f4f4f5',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px 24px 0 0',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: 'rgba(244,244,245,0.65)',
          '&.Mui-selected': {
            color: '#f4f4f5',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.25)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px -8px rgba(0,0,0,0.3)',
        },
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
