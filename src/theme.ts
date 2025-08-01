import { createTheme, alpha } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#b388ff' : '#7211a2',
        light: isDark ? '#e1b5ff' : '#9b3fd4',
        dark: isDark ? '#7c4dff' : '#4f0c73',
        contrastText: isDark ? '#000000' : '#ffffff',
      },
      secondary: {
        main: isDark ? '#424242' : '#ffffff',
        light: isDark ? '#616161' : '#ffffff',
        dark: isDark ? '#212121' : '#e6e6e6',
        contrastText: isDark ? '#ffffff' : '#7211a2',
      },
      background: {
        default: isDark ? '#121212' : '#fbf2ff',
        paper: isDark ? alpha('#1e1e1e', 0.8) : alpha('#ffffff', 0.7),
      },
      text: {
        primary: isDark ? '#ffffff' : '#2c1810',
        secondary: isDark ? '#b0b0b0' : '#666666',
      },
      divider: isDark ? alpha('#ffffff', 0.12) : alpha('#000000', 0.12),
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
            background: isDark 
              ? 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)'
              : 'linear-gradient(135deg, #fbf2ff 0%, #f0e6ff 100%)',
            backgroundImage: isDark
              ? `
                linear-gradient(135deg, #121212 0%, #1a1a1a 100%),
                radial-gradient(circle at 1px 1px, ${alpha('#b388ff', 0.3)} 1px, transparent 1px)
              `
              : `
                linear-gradient(135deg, #fbf2ff 0%, #f0e6ff 100%),
                radial-gradient(circle at 1px 1px, ${alpha('#4f0c73', 0.4)} 1px, transparent 1px)
              `,
            backgroundSize: '100% 100%, 20px 20px',
            minHeight: '100vh',
            transition: 'all 0.3s ease-in-out',
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
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: isDark 
                ? '0 4px 12px rgba(179, 136, 255, 0.15)' 
                : '0 4px 12px rgba(114, 17, 162, 0.15)',
            },
            '@media (max-width:600px)': {
              padding: '8px 16px',
            },
          },
          contained: {
            background: isDark 
              ? alpha('#b388ff', 0.9) 
              : alpha('#7211a2', 0.9),
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: isDark 
                ? alpha('#7c4dff', 0.9) 
                : alpha('#4f0c73', 0.9),
            },
          },
          outlined: {
            borderWidth: 2,
            backgroundColor: isDark 
              ? alpha('#1e1e1e', 0.7) 
              : alpha('#ffffff', 0.7),
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              borderWidth: 2,
              backgroundColor: isDark 
                ? alpha('#1e1e1e', 0.9) 
                : alpha('#ffffff', 0.9),
            },
          },
          text: {
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: isDark 
                ? alpha('#b388ff', 0.05) 
                : alpha('#7211a2', 0.05),
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            backdropFilter: 'blur(20px)',
            backgroundColor: isDark 
              ? alpha('#1e1e1e', 0.8) 
              : alpha('#ffffff', 0.7),
            boxShadow: isDark 
              ? '0 8px 32px rgba(179, 136, 255, 0.08)' 
              : '0 8px 32px rgba(114, 17, 162, 0.08)',
            border: isDark 
              ? '1px solid rgba(179, 136, 255, 0.1)' 
              : '1px solid rgba(114, 17, 162, 0.1)',
            transition: 'all 0.3s ease-in-out',
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
            backgroundColor: isDark 
              ? alpha('#1e1e1e', 0.8) 
              : alpha('#ffffff', 0.7),
            transition: 'all 0.3s ease-in-out',
          },
          elevation1: {
            boxShadow: isDark 
              ? '0 4px 16px rgba(179, 136, 255, 0.08)' 
              : '0 4px 16px rgba(114, 17, 162, 0.08)',
            transition: 'all 0.3s ease-in-out',
          },
          elevation2: {
            boxShadow: isDark 
              ? '0 8px 24px rgba(179, 136, 255, 0.12)' 
              : '0 8px 24px rgba(114, 17, 162, 0.12)',
            transition: 'all 0.3s ease-in-out',
          },
          elevation3: {
            boxShadow: isDark 
              ? '0 12px 32px rgba(179, 136, 255, 0.16)' 
              : '0 12px 32px rgba(114, 17, 162, 0.16)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              backgroundColor: isDark 
                ? alpha('#1e1e1e', 0.7) 
                : alpha('#ffffff', 0.7),
              backdropFilter: 'blur(10px)',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? '#b388ff' : '#7211a2',
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
            backgroundColor: isDark 
              ? alpha('#1e1e1e', 0.8) 
              : alpha('#ffffff', 0.7),
            boxShadow: isDark 
              ? '0 4px 16px rgba(179, 136, 255, 0.08)' 
              : '0 4px 16px rgba(114, 17, 162, 0.08)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backdropFilter: 'blur(20px)',
            backgroundColor: isDark 
              ? alpha('#1e1e1e', 0.8) 
              : alpha('#ffffff', 0.7),
            borderRight: isDark 
              ? '1px solid rgba(179, 136, 255, 0.1)' 
              : '1px solid rgba(114, 17, 162, 0.1)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            backdropFilter: 'blur(20px)',
            backgroundColor: isDark 
              ? alpha('#1e1e1e', 0.8) 
              : alpha('#ffffff', 0.7),
            boxShadow: isDark 
              ? '0 12px 48px rgba(179, 136, 255, 0.16)' 
              : '0 12px 48px rgba(114, 17, 162, 0.16)',
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
            backgroundColor: isDark 
              ? alpha('#1e1e1e', 0.8) 
              : alpha('#ffffff', 0.7),
            borderTop: isDark 
              ? '1px solid rgba(179, 136, 255, 0.1)' 
              : '1px solid rgba(114, 17, 162, 0.1)',
            boxShadow: isDark 
              ? '0 -4px 16px rgba(179, 136, 255, 0.08)' 
              : '0 -4px 16px rgba(114, 17, 162, 0.08)',
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
            backgroundColor: isDark 
              ? alpha('#b388ff', 0.1) 
              : alpha('#7211a2', 0.1),
            color: isDark ? '#b388ff' : '#7211a2',
            '& .MuiChip-icon': {
              color: isDark ? '#b388ff' : '#7211a2',
            },
            '&.MuiChip-colorSuccess': {
              backgroundColor: alpha('#2e7d32', 0.1),
              color: '#2e7d32',
              '& .MuiChip-icon': {
                color: '#2e7d32',
              },
            },
            '&.MuiChip-colorError': {
              backgroundColor: alpha('#d32f2f', 0.1),
              color: '#d32f2f',
              '& .MuiChip-icon': {
                color: '#d32f2f',
              },
            },
            '&.MuiChip-colorWarning': {
              backgroundColor: alpha('#ed6c02', 0.1),
              color: '#ed6c02',
              '& .MuiChip-icon': {
                color: '#ed6c02',
              },
            },
          },
          outlined: {
            borderColor: isDark 
              ? alpha('#b388ff', 0.3) 
              : alpha('#7211a2', 0.3),
            color: isDark ? '#b388ff' : '#7211a2',
            '& .MuiChip-icon': {
              color: isDark ? '#b388ff' : '#7211a2',
            },
            '&:hover': {
              backgroundColor: isDark 
                ? alpha('#b388ff', 0.05) 
                : alpha('#7211a2', 0.05),
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
              backgroundColor: isDark 
                ? alpha('#b388ff', 0.05) 
                : alpha('#7211a2', 0.05),
            },
            '& .MuiListItemButton-root': {
              borderRadius: 12,
              '&.Mui-selected': {
                backgroundColor: isDark 
                  ? alpha('#b388ff', 0.1) 
                  : alpha('#7211a2', 0.1),
                '&:hover': {
                  backgroundColor: isDark 
                    ? alpha('#b388ff', 0.15) 
                    : alpha('#7211a2', 0.15),
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
              backgroundColor: isDark 
                ? alpha('#b388ff', 0.05) 
                : alpha('#7211a2', 0.05),
            },
          },
        },
      },
    },
  });
};

// Default theme (light mode)
export const theme = createAppTheme('light'); 