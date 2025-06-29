// theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = 'light') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#00b14f',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#e5e7eb',
            },
            background: {
              default: '#f4f6f8',
              paper: '#ffffff',
            },
            text: {
              primary: '#0f172a',
              secondary: '#64748b',
            },
            grey: {
              100: '#f3f4f6',
              200: '#e5e7eb',
              300: '#d1d5db',
              400: '#9ca3af',
              500: '#6b7280',
              600: '#4b5563',
            },
          }
        : {
            primary: {
              main: '#00b14f',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#1f2937',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#a1a1aa',
            },
          }),
    },

    typography: {
      fontFamily: `"Inter", "Poppins", "Roboto", "Arial", sans-serif`,
      h1: { fontSize: '2.2rem', fontWeight: 700 },
      h2: { fontSize: '1.75rem', fontWeight: 700 },
      h3: { fontSize: '1.5rem', fontWeight: 600 },
      h4: { fontSize: '1.25rem', fontWeight: 600 },
      h5: { fontSize: '1rem', fontWeight: 600 },
      h6: { fontSize: '0.95rem', fontWeight: 500 },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },

    shape: {
      borderRadius: 14,
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: 'none',
            boxShadow: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: mode === 'light' ? '#009e45' : '#00c157',
              transform: 'scale(1.02)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            },
            '&:active': {
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.08)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === 'light'
                ? '0 2px 6px rgba(0,0,0,0.05)'
                : '0 1px 4px rgba(0,0,0,0.6)',
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === 'light'
                ? '0 4px 12px rgba(0,0,0,0.05)'
                : '0 4px 12px rgba(0,0,0,0.2)',
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow:
                mode === 'light'
                  ? '0 6px 16px rgba(0,0,0,0.08)'
                  : '0 6px 16px rgba(0,0,0,0.25)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
            borderRadius: 8,
            backgroundColor: mode === 'light' ? '#333' : '#ddd',
            color: mode === 'light' ? '#fff' : '#111',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: mode === 'light' ? '#fff' : '#252525',
          },
        },
      },
    },
  });
