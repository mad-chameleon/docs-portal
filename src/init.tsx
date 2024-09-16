import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import AuthContextProvider from "./contexts/AuthContext";
import App from "./App";
import {createTheme, ThemeProvider} from "@mui/material";

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
                <BrowserRouter>
                    <Provider store={store}>
                        <AuthContextProvider>
                            <App />
                        </AuthContextProvider>
                    </Provider>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default init;
