import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { editOperation } from '../../src/actions/operations';
import { Operation } from '../types';
import { AppDispatch } from '../store/index'; 

interface EditOperationDialogProps {
  operation: Operation;
  onClose: () => void;
}

const EditOperationDialog: React.FC<EditOperationDialogProps> = ({ operation, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(operation.name);
  const [number, setNumber] = useState(operation.number.toString());

  const handleSubmit = () => {
    dispatch(editOperation({ id: operation.id, operation: { name, number: parseInt(number) } })); 
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Operation</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOperationDialog;