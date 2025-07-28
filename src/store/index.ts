import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoReducer';

export const store = configureStore({
  reducer: {
    root: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
