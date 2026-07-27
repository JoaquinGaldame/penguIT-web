import { alpha, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A2E5C',
      light: '#1467C1',
      dark: '#071F3E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4A90E2',
      light: '#63B3ED',
      dark: '#2B6CB0',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#EDF2F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748',
      secondary: '#64748B',
    },
    divider: '#E2E8F0',
    success: {
      main: '#2E7D5B',
    },
    warning: {
      main: '#B7791F',
    },
    error: {
      main: '#C53030',
    },
    info: {
      main: '#1467C1',
    },
  },

  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),

    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },

    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          minHeight: '100%',
        },
        body: {
          minHeight: '100%',
          margin: 0,
          backgroundColor: '#EDF2F7',
        },
        '#root': {
          minHeight: '100vh',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 44,
          borderRadius: 8,
          paddingInline: 20,
          '&.MuiButton-containedPrimary:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }),
      },
    },

    MuiTextField: {
      defaultProps: {
        size: 'medium',
        fullWidth: true,
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: 48,
          borderRadius: 8,
          backgroundColor: theme.palette.background.paper,

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
          },

          '&.Mui-focused': {
            boxShadow: `0 0 0 3px ${alpha(
              theme.palette.secondary.main,
              0.14,
            )}`,
          },
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textDecoration: 'none',

          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});