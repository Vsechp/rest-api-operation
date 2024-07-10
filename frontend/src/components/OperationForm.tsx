import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOperation } from '../store/actions/operations';
import { TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const OperationForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addOperation({ name, number: parseInt(number) }));
    history.push('/');
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
      <Button type="submit" variant="contained" color="primary">
        Create Operation
      </Button>
    </form>
  );
};

export default OperationForm;
