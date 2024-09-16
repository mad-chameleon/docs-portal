import React from 'react';
import { Modal } from '@mui/material';
import TableForm from './forms/TableForm';
import { useDispatch, useSelector } from 'react-redux';
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
            <TableForm />
        </Modal>
    );
};

export default ModalDialog;
