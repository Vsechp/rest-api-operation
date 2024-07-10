import { createSlice } from '@reduxjs/toolkit';
import { Operation } from '../../types';
import { getOperations, addOperation, editOperation, removeOperation } from '../actions/operations';

interface OperationsState {
  operations: Operation[];
  loading: boolean;
  error: string | null;
}

const initialState: OperationsState = {
  operations: [],
  loading: false,
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
      .addCase(getOperations.fulfilled, (state, action) => {
        state.loading = false;
        state.operations = action.payload;
      })
      .addCase(getOperations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch operations';
      })
      .addCase(addOperation.fulfilled, (state, action) => {
        state.operations.push(action.payload);
      })
      .addCase(editOperation.fulfilled, (state, action) => {
        const index = state.operations.findIndex((op) => op.id === action.payload.id);
        if (index !== -1) {
          state.operations[index] = action.payload;
        }
      })
      .addCase(removeOperation.fulfilled, (state, action) => {
        state.operations = state.operations.filter((op) => op.id !== action.payload);
      });
  },
});

export default operationsSlice.reducer;
