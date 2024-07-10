import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSuboperation } from '../store/actions/suboperations';
import { TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const SuboperationForm: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { operationId } = useParams<{ operationId: string }>();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addSuboperation({ operationId, suboperation: { name, number: parseInt(number) } }));
    history.push(`/operation/${operationId}`);
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
        Create Suboperation
      </Button>
    </form>
  );
};

export default SuboperationForm;
