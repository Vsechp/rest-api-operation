import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOperations, addOperation, editOperation, removeOperation } from '../../actions/operations';
import { Operation, FetchOperationsResponse } from '../../types';

interface OperationsState {
  operations: Operation[];
  loading: boolean;
  currentPage: number;
  totalOperations: number;
  error: string | null;
}

const initialState: OperationsState = {
  operations: [],
  loading: false,
  currentPage: 1,
  totalOperations: 0,
  error: null,
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOperations.fulfilled, (state, action: PayloadAction<FetchOperationsResponse>) => {
        state.loading = false;
        state.operations = action.payload.operations;
        state.totalOperations = action.payload.total;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getOperations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch operations';
      })
      .addCase(addOperation.fulfilled, (state, action: PayloadAction<Operation>) => {
        state.operations.push(action.payload);
      })
      .addCase(editOperation.fulfilled, (state, action: PayloadAction<Operation>) => {
        const index = state.operations.findIndex((op) => op.id === action.payload.id);
        if (index !== -1) {
          state.operations[index] = action.payload;
        }
      })
      .addCase(removeOperation.fulfilled, (state, action: PayloadAction<string>) => {
        state.operations = state.operations.filter((op) => op.id !== action.payload);
      });
  },
});

export default operationsSlice.reducer;
