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
            error: {
              main: '#dc2626',
              contrastText: '#fff',
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
              main: '#009e45',
              contrastText: '#ffffff',
            },
            secondary: {
              main: '#1f2937',
            },
            error: {
              main: '#f87171',
              contrastText: '#fff',
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
      text: {
        primary: '#333333',
        secondary: '#555555',
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
              color: '#fff',
              transform: 'scale(1.02)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            },
            '&:active': {
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.08)',
            },
          },
        },
      },
        MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? '#dc2626' : '#f87171',
            },
            '&.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: mode === 'light' ? '#dc2626' : '#f87171',
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
      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
            backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e',
            color: mode === 'light' ? '#0f172a' : '#f1f5f9',
          },
          columnHeader: {
            backgroundColor: mode === 'light' ? '#f3f4f6' : '#292929', // dark but distinct
            color: mode === 'light' ? '#0f172a' : '#e2e8f0',            // soft light color
            fontWeight: 600,
            fontSize: '0.875rem',
            borderBottom: `1px solid ${mode === 'light' ? '#e5e7eb' : '#3f3f46'}`,
          },
          cell: {
            color: mode === 'light' ? '#0f172a' : '#e5e7eb',
            fontSize: '0.85rem',
          },
          row: {
            '&:hover': {
              backgroundColor: mode === 'light' ? '#f9fafb' : '#2f2f2f',
            },
          },
          footerContainer: {
            backgroundColor: mode === 'light' ? '#f9fafb' : '#2e2e2e',
            borderTop: `1px solid ${mode === 'light' ? '#e5e7eb' : '#3a3a3a'}`,
          },
          columnSeparator: {
            color: mode === 'light' ? '#e0e0e0' : '#444', // subtle separator
          },
          virtualScroller: {
            backgroundColor: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            border: `1px solid ${mode === 'light' ? '#e5e7eb' : '#333'}`,
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            transition: 'all 0.3s ease',
            '&:before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              // margin: '16px 0',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            '&:hover': {
              backgroundColor: mode === 'light' ? '#f9fafb' : '#2a2a2a',
              boxShadow:
                mode === 'light'
                  ? '0 4px 12px rgba(0, 0, 0, 0.06)'
                  : '0 4px 12px rgba(255, 255, 255, 0.05)',
              cursor: 'pointer',
            },
          },
        },
      },

      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            flexDirection: 'row-reverse',
            padding: '0 16px',
            minHeight: '56px',
            gap:10,
            height:10,
            borderRadius: 0,
            transition: 'all 0.3s ease',
            '&.Mui-expanded': {
              backgroundColor: mode === 'light' ? '#ecfdf5' : '#17403b',
            },
            '&:hover': {
              backgroundColor: mode === 'light' ? '#e6f4ea' : '#264d3b',
            },
            '& .MuiAccordionSummary-content': {
              marginLeft: 8,
              fontWeight: 600,
              alignItems: 'center',
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              transition: 'transform 0.3s ease',
            },
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(90deg)',
            },
          },
        },
      },

      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: '16px',
            backgroundColor: mode === 'light' ? '#f9fafb' : '#2c2c2c',
            borderTop: `1px solid ${mode === 'light' ? '#e5e7eb' : '#444'}`,
            transition: 'background-color 0.3s ease',
          },
        },
      },

    },
  });
