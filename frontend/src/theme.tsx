// src/theme.tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // Verde azulado
    },
    secondary: {
      main: '#0288d1', // Azul cielo
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

export default theme;