import axios from 'axios';
import { Operation } from '../types';

const API_URL = 'http://localhost:8080/api/operations';

export const fetchOperations = async (page: number, search: string) => {
  const response = await axios.get<Operation[]>(`${API_URL}`, {
    params: {
      page,
      search
    }
  });
  return response.data;
};

export const fetchOperationById = async (id: string): Promise<Operation> => {
  try {
    const response = await axios.get<Operation>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
};

export const createOperation = async (operation: Omit<Operation, 'id'>) => {
  const response = await axios.post<Operation>(API_URL, operation);
  return response.data;
};

export const updateOperation = async (id: string, operation: Partial<Operation>) => {
  const response = await axios.put<Operation>(`${API_URL}/${id}`, operation);
  return response.data;
};

export const deleteOperation = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const forceDeleteOperation = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}/force`);
  return response.data;
};
