import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSuboperations, createSuboperation, updateSuboperation, deleteSuboperation } from '../api/suboperations';
import { Suboperation } from '../types';


export const getSuboperations = createAsyncThunk(
  'suboperations/fetchAll',
  async (operationId: string) => {
    try {
      const suboperations = await fetchSuboperations(operationId);
      return suboperations;
    } catch (error) {
      throw Error('Failed to fetch suboperations');
    }
  }
);


export const addSuboperation = createAsyncThunk(
  'suboperations/create',
  async ({ operationId, suboperation }: { operationId: string; suboperation: Omit<Suboperation, 'id' | 'operation_id'> }) => {
    try {
      const newSuboperation = await createSuboperation(operationId, suboperation);
      return newSuboperation;
    } catch (error) {
      throw Error('Failed to add suboperation'); 
    }
  }
);


export const editSuboperation = createAsyncThunk(
  'suboperations/update',
  async ({ id, suboperation }: { id: string; suboperation: Partial<Suboperation> }) => {
    try {
      const updatedSuboperation = await updateSuboperation(id, suboperation);
      return updatedSuboperation;
    } catch (error) {
      throw Error('Failed to update suboperation');
    }
  }
);


export const removeSuboperation = createAsyncThunk(
  'suboperations/delete',
  async (id: string) => {
    try {
      await deleteSuboperation(id);
      return id;
    } catch (error) {
      throw Error('Failed to delete suboperation'); 
    }
  }
);
