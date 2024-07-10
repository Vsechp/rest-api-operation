import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOperations, createOperation, updateOperation, deleteOperation } from '../api/operations';
import { Operation } from '../types';

export const getOperations = createAsyncThunk(
  'operations/fetchAll',
  async ({ page, search }: { page: number; search: string }) => {
    const operations = await fetchOperations(page, search);
    return operations;
  }
);

export const addOperation = createAsyncThunk(
  'operations/create',
  async (operation: Omit<Operation, 'id'>) => {
    const newOperation = await createOperation(operation);
    return newOperation;
  }
);

export const editOperation = createAsyncThunk(
  'operations/update',
  async ({ id, operation }: { id: string; operation: Partial<Operation> }) => {
    const updatedOperation = await updateOperation(id, operation);
    return updatedOperation;
  }
);

export const removeOperation = createAsyncThunk(
  'operations/delete',
  async (id: string) => {
    await deleteOperation(id);
    return id;
  }
);
