import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Column {
  userId?: string;
  id: string;
  title: string;
}

interface ColumnState {
  columns: Column[];
}

const initialState: ColumnState = {
  columns: [
    { id: 'todo', title: 'Нужно сделать' },
    { id: 'inProgress', title: 'В процессе' },
    { id: 'completed', title: 'Завершенные' },
  ],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<Column[]>) {
      state.columns = action.payload;
    },
    addColumn(state, action: PayloadAction<Column>) {
      state.columns.push(action.payload);
    },
    updateColumn(state, action: PayloadAction<Column>) {
      const { id, title } = action.payload;
      const column = state.columns.find((column) => column.id === id);
      if (column) {
        column.title = title;
      }
    },
    deleteColumn(state, action: PayloadAction<string>) {
      state.columns = state.columns.filter(
        (column) => column.id !== action.payload
      );
    },
  },
});

export const { setColumns, addColumn, updateColumn, deleteColumn } =
  columnsSlice.actions;

export default columnsSlice.reducer;
