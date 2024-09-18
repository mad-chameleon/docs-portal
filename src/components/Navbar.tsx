import React from 'react';
import {
  AppBar, IconButton, Toolbar, Typography,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logOut } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#eeeeee', color: 'black' }}>
      <Toolbar>
        <Typography color="success" variant="overline" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', textTransform: 'uppercase' }}>
          Document Control Panel
        </Typography>
        {isLoggedIn && (
        <IconButton onClick={() => logOut()} color="inherit">
          <Logout />
        </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
