import axios from 'axios';

const API_URL = 'http://localhost:8000/operations';

export const addOperation = async (operation: { name: string }) => {
  try {
    const response = await axios.post(API_URL, operation);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении операции:', error);
    throw error;
  }
};