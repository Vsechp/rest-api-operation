import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Box, Snackbar } from '@mui/material';
import { addOperation } from '../actions/operations';
import { Operation } from '../types';
import { AppDispatch } from '../store';
import { Link } from 'react-router-dom'; 

interface CreateOperationComponentProps {
  onOperationCreated: (operationId: string) => void;
}

const CreateOperationComponent: React.FC<CreateOperationComponentProps> = ({ onOperationCreated }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [operationName, setOperationName] = useState('');
  const [operationNumber, setOperationNumber] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleOperationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperationName(e.target.value);
  };

  const handleOperationNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOperationNumber(Number(e.target.value));
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const newOperation: Partial<Operation> = {
        name: operationName,
        number: operationNumber,
      };
      const resultAction = await dispatch(addOperation(newOperation as Operation)).unwrap();
      onOperationCreated(resultAction.id);
      setSuccess(true); 
    } catch (err) {
      console.error('Error creating operation:', err);
      setError('An error occurred while creating the operation. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <Box>
      <Typography variant="h6">Create Operation</Typography>
      <TextField
        label="Operation Name"
        value={operationName}
        onChange={handleOperationNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Operation Number"
        type="number"
        value={operationNumber}
        onChange={handleOperationNumberChange}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSubmit} color="primary" variant="contained">
        Create Operation
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Operation created successfully" />
      {}
      <Box mt={2}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Вернуться на главную
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CreateOperationComponent;