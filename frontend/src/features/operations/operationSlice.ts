import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { addOperation as addOperationAPI } from '../../api/operationsAPI';

interface OperationState {
  operations: any[];
}

const initialState: OperationState = {
  operations: [],
};

export const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    setOperations: (state, action: PayloadAction<any[]>) => {
      state.operations = action.payload;
    },
    addOperation: (state, action: PayloadAction<any>) => {
      state.operations.push(action.payload);
    },
  },
});

export const { setOperations, addOperation } = operationsSlice.actions;


export const saveOperation = (operation: { name: string }): AppThunk => async dispatch => {
  try {
    const newOperation = await addOperationAPI(operation);
    dispatch(addOperation(newOperation));
  } catch (error) {
    console.error('Ошибка при добавлении операции:', error);
  }
};

export default operationsSlice.reducer;