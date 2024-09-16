import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './slices/tableSlice'
import modalReducer from "./slices/modalSlice";

const store = configureStore({
    reducer: {
        table: tableReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
