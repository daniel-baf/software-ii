import { createTheme } from '@mui/material/styles';

const mainColor = '#e0e5ec';
const lightShadow = '#ffffff';
const darkShadow = '#a3b1c6';

const theme = createTheme({
  palette: {
    background: {
      default: mainColor,
      paper: mainColor,
    },
    primary: {
      main: '#6e7dff',
    },
    text: {
      primary: '#4a5568',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          boxShadow: `5px 5px 10px ${darkShadow}, -5px -5px 10px ${lightShadow}`,
          color: '#4a5568',
          textTransform: 'none',
          padding: '10px 20px',
          backgroundColor: mainColor,
          '&:hover': {
            boxShadow: `inset 5px 5px 10px ${darkShadow}, inset -5px -5px 10px ${lightShadow}`,
            backgroundColor: mainColor,
          },
        },
        containedPrimary: {
            backgroundColor: '#6e7dff',
            color: '#fff',
            boxShadow: `5px 5px 10px ${darkShadow}, -5px -5px 10px ${lightShadow}`,
            '&:hover': {
                backgroundColor: '#5a6ae6',
            }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mainColor,
          boxShadow: `9px 9px 16px ${darkShadow}, -9px -9px 16px ${lightShadow}`,
          borderRadius: 20,
        },
        elevation1: {
            boxShadow: `9px 9px 16px ${darkShadow}, -9px -9px 16px ${lightShadow}`,
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mainColor,
          boxShadow: `9px 9px 16px ${darkShadow}, -9px -9px 16px ${lightShadow}`,
          borderRadius: 20,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 15,
            backgroundColor: mainColor,
            boxShadow: `inset 5px 5px 10px ${darkShadow}, inset -5px -5px 10px ${lightShadow}`,
            '& fieldset': {
              border: 'none',
            },
          },
        },
      },
    },
  },
});

export default theme;
