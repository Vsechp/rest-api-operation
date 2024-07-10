import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubOperation {
  id: string;
  name: string;
  isDeleted?: boolean;
}

interface Operation {
  id: string;
  name: string;
  amount: number;
  subOperations: SubOperation[];
}

interface OperationState {
  operations: Operation[];
  currentOperation?: Operation; // Для показа карточки отдельной операции
}

const initialState: OperationState = {
  operations: [],
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    setOperations: (state, action: PayloadAction<Operation[]>) => {
      state.operations = action.payload;
    },
    addOperation: (state, action: PayloadAction<Operation>) => {
      state.operations.push(action.payload);
    },
    setCurrentOperation: (state, action: PayloadAction<string>) => {
      state.currentOperation = state.operations.find(op => op.id === action.payload);
    },
    softDeleteSubOperation: (state, action: PayloadAction<{ operationId: string; subOperationId: string }>) => {
      const { operationId, subOperationId } = action.payload;
      const operation = state.operations.find(op => op.id === operationId);
      if (operation) {
        const subOperation = operation.subOperations.find(subOp => subOp.id === subOperationId);
        if (subOperation) {
          subOperation.isDeleted = true;
        }
      }
    },
    hardDeleteSubOperation: (state, action: PayloadAction<{ operationId: string; subOperationId: string }>) => {
      const { operationId, subOperationId } = action.payload;
      const operation = state.operations.find(op => op.id === operationId);
      if (operation) {
        operation.subOperations = operation.subOperations.filter(subOp => subOp.id !== subOperationId);
      }
    },
    editOperationName: (state, action: PayloadAction<{ operationId: string; newName: string }>) => {
      const { operationId, newName } = action.payload;
      const operation = state.operations.find(op => op.id === operationId);
      if (operation) {
        operation.name = newName;
      }
    },
    editSubOperationName: (state, action: PayloadAction<{ operationId: string; subOperationId: string; newName: string }>) => {
      const { operationId, subOperationId, newName } = action.payload;
      const operation = state.operations.find(op => op.id === operationId);
      if (operation) {
        const subOperation = operation.subOperations.find(subOp => subOp.id === subOperationId);
        if (subOperation) {
          subOperation.name = newName;
        }
      }
    },
  },
});

export const {
  setOperations,
  addOperation,
  setCurrentOperation,
  softDeleteSubOperation,
  hardDeleteSubOperation,
  editOperationName,
  editSubOperationName,
} = operationsSlice.actions;

export default operationsSlice.reducer;