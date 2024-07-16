import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { editSuboperation } from '../../src/actions/suboperations';
import { Suboperation } from '../types';
import { AppDispatch } from '../store/index';

interface EditSuboperationDialogProps {
  suboperation: Suboperation;
  onClose: () => void;
}

const EditSuboperationDialog: React.FC<EditSuboperationDialogProps> = ({ suboperation, onClose }) => {
  const dispatch = useDispatch<AppDispatch>(); 
  const [name, setName] = useState(suboperation.name);
  const [number, setNumber] = useState(suboperation.number.toString());

  const handleSubmit = () => {
    dispatch(editSuboperation({ id: suboperation.id, suboperation: { name, number: parseInt(number) } }));
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Suboperation</DialogTitle>
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

export default EditSuboperationDialog;