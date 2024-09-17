import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataRow } from '../../interfaces';
/* eslint-disable no-param-reassign */
interface State {
    tableData: DataRow[];
}

const initialState: State = {
  tableData: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, { payload }) => {
      state.tableData = payload;
    },
    removeRow: (state, { payload }) => {
      state.tableData = state.tableData.filter((row) => row.id !== payload.id);
    },
    editRow: (state, { payload }) => {
      const index = state.tableData.findIndex((row) => row.id === payload.id);
      if (index !== -1) {
        state.tableData[index] = { ...state.tableData[index], ...payload };
      }
    },
    addRow: (state, action: PayloadAction<DataRow>) => {
      state.tableData = [action.payload, ...state.tableData];
    },

  },
});

export const {
  setTableData,
  removeRow,
  editRow,
  addRow,
} = tableSlice.actions;
export default tableSlice.reducer;
