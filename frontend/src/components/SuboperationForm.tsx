import React, { useState } from 'react';
import { AppDispatch } from '../store/index';
import { useDispatch } from 'react-redux';
import { addSuboperation } from '../actions/suboperations';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

interface SubOperationFormProps {
  onSave: (data: any) => void;
  operationId: string;
}

const SuboperationForm: React.FC<SubOperationFormProps> = ({ onSave }) => {
  const { id: operationId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedNumber = parseInt(number, 10);
    if (!name.trim() || isNaN(parsedNumber) || parsedNumber <= 0) {
      alert('Please fill in all fields correctly. Number must be a valid integer greater than 0.');
      return;
    }

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const suboperation = { name, number: parsedNumber, created_at: createdAt, updated_at: updatedAt, deleted_at: null };

    dispatch(addSuboperation({ operationId: operationId!, suboperation }));

    onSave(suboperation);

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Number"
        type="number" 
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Add Suboperation
      </Button>
    </form>
  );
};


export default SuboperationForm;
export type { SubOperationFormProps };
