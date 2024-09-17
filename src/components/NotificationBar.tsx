import { Alert, Snackbar } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface NotificationBarProps {
    errorMessage: string;
    isOpen: boolean;
}
const NotificationBar: React.FC<NotificationBarProps> = ({ errorMessage, isOpen }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      onClose={handleClose}
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert sx={{ mb: 2 }} icon={<ErrorOutline fontSize="inherit" />} severity="error" variant="filled">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBar;
