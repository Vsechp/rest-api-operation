import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getOperations,
  addOperation,
  editOperation,
  removeOperation,
} from "../actions/operations";
import { Operation, FetchOperationsResponse } from "../types";

interface OperationsState {
  operations: Operation[];
  loading: boolean;
  currentPage: number;
  totalCount: number;
  error: string | null;
}

const initialState: OperationsState = {
  operations: [],
  loading: false,
  currentPage: 1,
  totalCount: 0,
  error: null,
};

const operationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOperations.fulfilled,
        (state, action: PayloadAction<FetchOperationsResponse>) => {
          state.loading = false;
          if (state.currentPage === 1) {
            state.operations = action.payload.operations;
          } else {
            state.operations = [...state.operations, ...action.payload.operations];
          }
          state.totalCount = action.payload.total;
        }
      )
      .addCase(getOperations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch operations";
      })
      .addCase(
        addOperation.fulfilled,
        (state, action: PayloadAction<Operation>) => {
          state.operations.push(action.payload);
        }
      )
      .addCase(
        editOperation.fulfilled,
        (state, action: PayloadAction<Operation>) => {
          const index = state.operations.findIndex(
            (op) => op.id === action.payload.id
          );
          if (index !== -1) {
            state.operations[index] = action.payload;
          }
        }
      )
      .addCase(
        removeOperation.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.operations = state.operations.filter(
            (op) => op.id !== action.payload
          );
        }
      );
  },
});

export const { setPage } = operationsSlice.actions;

export default operationsSlice.reducer;