import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Box, Snackbar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addOperation } from '../actions/operations';
import { Operation } from '../types';
import { AppDispatch } from '../store';
import { Link } from 'react-router-dom';

interface CreateOperationComponentProps {
  onOperationCreated: (operationId: string) => void;
  onDeleteOperation?: () => void; 
}

const CreateOperationComponent: React.FC<CreateOperationComponentProps> = ({ onOperationCreated, onDeleteOperation }) => {
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
    <Box sx={{ padding: 2, backgroundColor: '#f3f2f7', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <Typography variant="h5" color="secondary" gutterBottom>Create Operation</Typography>
      <TextField
        label="Operation Name"
        value={operationName}
        onChange={handleOperationNameChange}
        fullWidth
        margin="normal"
        variant="outlined"
        color="secondary"
      />
      <TextField
        label="Operation Number"
        type="number"
        value={operationNumber === 0 ? '' : operationNumber}
        onChange={handleOperationNumberChange}
        fullWidth
        margin="normal"
        variant="outlined"
        color="secondary"
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#5e35b1' }, marginY: 2 }}>
        Create Operation
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <Snackbar open={success} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Operation created successfully" />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Back to Main
          </Button>
        </Link>
        {onDeleteOperation && (
          <IconButton onClick={onDeleteOperation} color="error" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default CreateOperationComponent;