import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
interface ModalState {
    modalType: string | null;
    isOpen: boolean;
    currentRowId: string | null;
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
    showModal: (state, action: PayloadAction<{ modalType: string; id?: string }>) => {
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
  hideModal,
} = modalSlice.actions;

export default modalSlice.reducer;
