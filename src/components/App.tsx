import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useAuth } from '../AuthContext';
import ProfilePage from './pages/ProfilePage';
import routes from '../routes';

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path={routes.profilePagePath()}
        element={isLoggedIn ? <ProfilePage /> : <Navigate to={routes.loginPagePath()} />}
      />
      <Route
        path={routes.loginPagePath()}
        element={isLoggedIn ? <Navigate to={routes.profilePagePath()} /> : <LoginPage />}
      />
    </Routes>
  );
};

export default App;
