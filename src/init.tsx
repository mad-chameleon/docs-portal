import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store from './store';
import AuthContextProvider from './AuthContext';
import App from './components/App';
import 'dayjs/locale/ru';

const init = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1565c0',
      },
      secondary: {
        main: '#546e7a',
      },
      error: {
        main: '#e53935',
      },
      warning: {
        main: '#fbc02d',
      },
      info: {
        main: '#263238',
      },
      success: {
        main: '#388e3c',
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            '&.Mui-disabled': {
              backgroundColor: '#5c6bc0',
              color: '#ffffff',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&.Mui-disabled.MuiIconButton-colorSuccess': {
              color: '#c8e6c9',
            },
            '&.Mui-disabled.MuiIconButton-colorError': {
              color: '#ffcdd2',
            },
          },
        },
      },
    },
  });

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
          <BrowserRouter>
            <Provider store={store}>
              <AuthContextProvider>
                <App />
              </AuthContextProvider>
            </Provider>
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default init;
