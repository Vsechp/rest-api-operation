import axios from 'axios';
import { Suboperation } from '../types';

const API_URL = 'http://localhost:8080/api/suboperations';

export const fetchSuboperations = async (operationId: string) => {
  const response = await axios.get<Suboperation[]>(`${API_URL}?operationId=${operationId}`);
  return response.data;
};

export const createSuboperation = async (operationId: string, suboperation: Omit<Suboperation, 'id' | 'operation_id'>) => {
  const response = await axios.post<Suboperation>(`${API_URL}/${operationId}`, suboperation);
  return response.data;
};

export const updateSuboperation = async (id: string, suboperation: Partial<Suboperation>) => {
  const response = await axios.put<Suboperation>(`${API_URL}/${id}`, suboperation);
  return response.data;
};

export const deleteSuboperation = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
