import React from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TableForm from './forms/TableForm';
import { RootState } from '../store';
import { hideModal } from '../store/slices/modalSlice';

const ModalDialog: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);

  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(hideModal())}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          backgroundColor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <TableForm />
      </Box>
    </Modal>
  );
};

export default ModalDialog;
