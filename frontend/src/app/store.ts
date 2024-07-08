import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import operationsReducer from '../features/operations/operationSlice';

export const store = configureStore({
  reducer: {
    operations: operationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;