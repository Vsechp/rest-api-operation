import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSuboperations, createSuboperation, updateSuboperation, deleteSuboperation } from '../../api/suboperations';
import { Suboperation } from '../../types';

export const getSuboperations = createAsyncThunk(
  'suboperations/fetchAll',
  async () => {
    const suboperations = await fetchSuboperations();
    return suboperations;
  }
);

export const addSuboperation = createAsyncThunk(
  'suboperations/create',
  async ({ operationId, suboperation }: { operationId: string; suboperation: Omit<Suboperation, 'id' | 'operation_id'> }) => {
    const newSuboperation = await createSuboperation(operationId, suboperation);
    return newSuboperation;
  }
);

export const editSuboperation = createAsyncThunk(
  'suboperations/update',
  async ({ id, suboperation }: { id: string; suboperation: Partial<Suboperation> }) => {
    const updatedSuboperation = await updateSuboperation(id, suboperation);
    return updatedSuboperation;
  }
);

export const removeSuboperation = createAsyncThunk(
  'suboperations/delete',
  async (id: string) => {
    await deleteSuboperation(id);
    return id;
  }
);
