import React, { FC } from 'react';
import {
  Container, Grid2, Card, CardContent,
} from '@mui/material';
import LoginForm from '../forms/LoginForm';

const LoginPage: FC = () => (
  <Container component="main" maxWidth="xs" sx={{ height: '100vh' }}>
    <Grid2
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%' }}
    >
      <Grid2>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  </Container>
);

export default LoginPage;
