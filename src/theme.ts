import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7211a2',
      light: '#9b3fd4',
      dark: '#4f0c73',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#e6e6e6',
      contrastText: '#7211a2',
    },
    background: {
      default: '#fbf2ff',
      paper: alpha('#ffffff', 0.7),
    },
    text: {
      primary: '#2c1810',
      secondary: '#666666',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '0.875rem',
      },
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #fbf2ff 0%, #f0e6ff 100%)',
          backgroundImage: `
            linear-gradient(135deg, #fbf2ff 0%, #f0e6ff 100%),
            radial-gradient(circle at 1px 1px, ${alpha('#8027ab', 0.6)} 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 12px 12px',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontWeight: 500,
          boxShadow: 'none',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(114, 17, 162, 0.15)',
          },
          '@media (max-width:600px)': {
            padding: '8px 16px',
          },
        },
        contained: {
          background: alpha('#7211a2', 0.9),
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: alpha('#4f0c73', 0.9),
          },
        },
        outlined: {
          borderWidth: 2,
          backgroundColor: alpha('#ffffff', 0.7),
          backdropFilter: 'blur(10px)',
          '&:hover': {
            borderWidth: 2,
            backgroundColor: alpha('#ffffff', 0.9),
          },
        },
        text: {
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: alpha('#7211a2', 0.05),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.7),
          boxShadow: '0 8px 32px rgba(114, 17, 162, 0.08)',
          border: '1px solid rgba(114, 17, 162, 0.1)',
          '@media (max-width:600px)': {
            borderRadius: 16,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.7),
        },
        elevation1: {
          boxShadow: '0 4px 16px rgba(114, 17, 162, 0.08)',
        },
        elevation2: {
          boxShadow: '0 8px 24px rgba(114, 17, 162, 0.12)',
        },
        elevation3: {
          boxShadow: '0 12px 32px rgba(114, 17, 162, 0.16)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: alpha('#ffffff', 0.7),
            backdropFilter: 'blur(10px)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#7211a2',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
            '@media (max-width:600px)': {
              fontSize: '0.875rem',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.7),
          boxShadow: '0 4px 16px rgba(114, 17, 162, 0.08)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.7),
          borderRight: '1px solid rgba(114, 17, 162, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.7),
          boxShadow: '0 12px 48px rgba(114, 17, 162, 0.16)',
          '@media (max-width:600px)': {
            borderRadius: 16,
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor: alpha('#ffffff', 0.7),
          borderTop: '1px solid rgba(114, 17, 162, 0.1)',
          boxShadow: '0 -4px 16px rgba(114, 17, 162, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          backdropFilter: 'blur(10px)',
        },
        filled: {
          backgroundColor: alpha('#7211a2', 0.1),
          color: '#7211a2',
          '&.MuiChip-colorSuccess': {
            backgroundColor: alpha('#2e7d32', 0.1),
            color: '#2e7d32',
          },
          '&.MuiChip-colorError': {
            backgroundColor: alpha('#d32f2f', 0.1),
            color: '#d32f2f',
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: alpha('#ed6c02', 0.1),
            color: '#ed6c02',
          },
        },
        outlined: {
          borderColor: alpha('#7211a2', 0.3),
          color: '#7211a2',
          '&:hover': {
            backgroundColor: alpha('#7211a2', 0.05),
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: alpha('#7211a2', 0.05),
          },
          '& .MuiListItemButton-root': {
            borderRadius: 12,
            '&.Mui-selected': {
              backgroundColor: alpha('#7211a2', 0.1),
              '&:hover': {
                backgroundColor: alpha('#7211a2', 0.15),
              },
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: alpha('#7211a2', 0.05),
          },
        },
      },
    },
  },
}); 