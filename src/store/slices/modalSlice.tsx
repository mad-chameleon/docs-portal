import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    modalType: string | null;
    isOpen: boolean;
    currentRowId: number | null;
}

const initialState: ModalState = {
    modalType: null,
    isOpen: false,
    currentRowId: null,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<{ modalType: string; id?: number }>) => {
            state.modalType = action.payload.modalType;
            state.isOpen = true;
            state.currentRowId = action.payload.id ?? null;
        },
        hideModal: (state) => {
            state.modalType = null;
            state.isOpen = false;
            state.currentRowId = null;
        },
    },
});

export const {
    showModal,
    hideModal
} = modalSlice.actions;

export default modalSlice.reducer;
