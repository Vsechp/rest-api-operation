import { createSlice } from '@reduxjs/toolkit';
import { Suboperation } from '../../types';
import { getSuboperations, addSuboperation, editSuboperation, removeSuboperation } from '../actions/suboperations';

interface SuboperationsState {
  suboperations: Suboperation[];
  loading: boolean;
  error: string | null;
}

const initialState: SuboperationsState = {
  suboperations: [],
  loading: false,
  error: null,
};

const suboperationsSlice = createSlice({
  name: 'suboperations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuboperations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuboperations.fulfilled, (state, action) => {
        state.loading = false;
        state.suboperations = action.payload;
      })
      .addCase(getSuboperations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch suboperations';
      })
      .addCase(addSuboperation.fulfilled, (state, action) => {
        state.suboperations.push(action.payload);
      })
      .addCase(editSuboperation.fulfilled, (state, action) => {
        const index = state.suboperations.findIndex((sub) => sub.id === action.payload.id);
        if (index !== -1) {
          state.suboperations[index] = action.payload;
        }
      })
      .addCase(removeSuboperation.fulfilled, (state, action) => {
        state.suboperations = state.suboperations.filter((sub) => sub.id !== action.payload);
      });
  },
});

export default suboperationsSlice.reducer;
