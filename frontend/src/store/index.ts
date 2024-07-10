import { configureStore } from '@reduxjs/toolkit';
import operationsReducer from './reducers/operations';
import suboperationsReducer from './reducers/suboperations';

const store = configureStore({
  reducer: {
    operations: operationsReducer,
    suboperations: suboperationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
