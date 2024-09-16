import React, {useRef, FC, useState} from 'react';
import { useFormik, FormikHelpers } from 'formik';
import {TextField, Button, Typography, Box, CircularProgress} from '@mui/material';
import * as Yup from 'yup';

interface FormValues {
    username: string;
    password: string;
};

const LoginForm: FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [formState, setFormState] = useState({
        isError: false,
        errorMessage: '',
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            username: '',
            password: '',
        },

        validationSchema: Yup.object({
            username: Yup.string().required('Введите ваш ник'),
            password: Yup.string().required('Введите пароль'),
        }),

        onSubmit: async(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
            setSubmitting(true);
            try {
                await new Promise((_, reject) => {
                    setTimeout(() => {
                        reject(new Error('kjj'));
                    }, 2000);
                });
            } catch(err) {
                setFormState({ isError: true, errorMessage: 'Неверные имя пользователя или пароль'})
                setSubmitting(false);
            }

        },
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
        >
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                Войти
            </Typography>

            <TextField
                inputRef={inputRef}
                fullWidth
                label="Ваш ник"
                margin="normal"
                disabled={formik.isSubmitting}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                {...formik.getFieldProps('username')}
            />

            <TextField
                fullWidth
                label="Пароль"
                type="password"
                margin="normal"
                disabled={formik.isSubmitting}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
            />

            {formState.isError && (
                <Typography color="error" variant="body2">
                    {formState.errorMessage}
                </Typography>
            )}

            <Button
                size={"large"}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 3 }}
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? (
                    <>
                        <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
                        Подождите...
                    </>
                ) : (
                    'Войти'
                )}
            </Button>
        </Box>
    );
};

export default LoginForm;
