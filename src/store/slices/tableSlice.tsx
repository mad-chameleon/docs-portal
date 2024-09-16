import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DataRow} from "../../data";

interface State {
    tableData: DataRow[];
    currentRowId: string | null;
}

const initialState: State = {
    tableData: [],
    currentRowId: null,
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableData: (state, { payload }) => {
            state.tableData = payload;
        },
        removeRow: (state, { payload }) => {
            state.tableData = state.tableData.filter((row, id) => id !== payload.id);
        },
        editRow: (state, { payload }) => {
            const { index, updatedRow } = payload;
            if (index >= 0 && index < state.tableData.length) {
                state.tableData[index] = { ...state.tableData[index], ...updatedRow };
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
