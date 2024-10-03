import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './taskSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Тип состояния
export type AppDispatch = typeof store.dispatch; // Тип dispatch

export default store;
