import React from 'react';
import './App.css';
import LoginPage from "./components/pages/LoginPage";
import {useAuth} from "./contexts/AuthContext";
import ProfilePage from "./components/pages/ProfilePage";
import {Navigate, Routes, Route} from "react-router-dom";
import routes from "./routes";

const App = () => {
    const { isLoggedIn } = useAuth();

    return (
        <div>
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
        </div>
  );
};

export default App;
