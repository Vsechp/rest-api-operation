import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Operation, FetchOperationsResponse } from '../types';

const API_URL = 'http://localhost:8080/api/operations';

export const getOperations = createAsyncThunk<FetchOperationsResponse, { page: number; search: string }>(
  'operations/getOperations',
  async ({ page, search }) => {
    const response = await axios.get<FetchOperationsResponse>(API_URL, {
      params: { page, search }
    });
    return response.data;
  }
);

export const getOperationById = createAsyncThunk<Operation, string>(
  'operations/getOperationById',
  async (id) => {
    const response = await axios.get<Operation>(`${API_URL}/${id}`);
    return response.data;
  }
);

export const addOperation = createAsyncThunk(
  'operations/create',
  async (operation: Omit<Operation, 'id'>) => {
    const response = await axios.post(API_URL, operation);
    return response.data;
  }
);

export const editOperation = createAsyncThunk(
  'operations/update',
  async ({ id, operation }: { id: string; operation: Partial<Operation> }) => {
    const response = await axios.put(`${API_URL}/${id}`, operation);
    return response.data;
  }
);

export const removeOperation = createAsyncThunk(
  'operations/delete',
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const forceRemoveOperation = createAsyncThunk(
  'operations/forceDelete',
  async (id: string) => {
    await axios.delete(`${API_URL}/${id}/force`);
    return id;
  }
);
