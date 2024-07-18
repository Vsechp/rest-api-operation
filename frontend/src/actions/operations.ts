import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Operation, FetchOperationsResponse } from '../types';


export const getOperations = createAsyncThunk<FetchOperationsResponse, { page: number; search: string }>(
  'operations/getOperations',
  async ({ page, search }) => {
    const response = await fetch(`/api/operations?page=${page}&search=${search}`);
    const data = await response.json();
    return {
      operations: data.data,
      total: data.total, 
      currentPage: data.current_page, 
    } as FetchOperationsResponse;
  }
);

export const addOperation = createAsyncThunk(
  'operations/create',
  async (operation: Omit<Operation, 'id'>) => {
    const response = await axios.post('/api/operations', operation);
    return response.data;
  }
);

export const editOperation = createAsyncThunk(
  'operations/update',
  async ({ id, operation }: { id: string; operation: Partial<Operation> }) => {
    const response = await axios.put(`/api/operations/${id}`, operation);
    return response.data;
  }
);

export const removeOperation = createAsyncThunk(
  'operations/delete',
  async (id: string) => {
    await axios.delete(`/api/operations/${id}`);
    return id;
  }
);

export const forceRemoveOperation = createAsyncThunk(
  'operations/forceDelete',
  async (id: string) => {
    await axios.delete(`/api/operations/${id}/force`);
    return id;
  }
);

export const setPage = (page: number) => ({
  type: 'operations/setPage',
  payload: page,
});
