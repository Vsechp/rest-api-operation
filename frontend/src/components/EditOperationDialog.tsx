import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { editOperation } from '../actions/operations';
import { Operation } from '../types';
import { AppDispatch } from '../store/index';

interface EditOperationDialogProps {
  operation: Operation;
  onClose: () => void;
  onSave: (updatedOperation: Operation) => void;
  onDelete?: () => void; 
}

const EditOperationDialog: React.FC<EditOperationDialogProps> = ({ operation, onClose, onSave, onDelete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(operation.name);

  const handleSubmit = () => {
    dispatch(editOperation({ id: operation.id, operation: { name } }))
      .then(() => {
        onSave({ ...operation, name });
        onClose();
      });
  };

  return (
    <Dialog open onClose={onClose} sx={{ '& .MuiDialog-container': { alignItems: 'flex-start' } }}>
      <DialogTitle sx={{ backgroundColor: '#f3e5f5' }}>Edit Operation</DialogTitle>
      <DialogContent sx={{ backgroundColor: '#f3e5f5' }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          color="secondary"
        />
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#f3e5f5', justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="contained" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#7b1fa2' } }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#7b1fa2' } }}>
          Save
        </Button>
        {onDelete && (
          <IconButton onClick={onDelete} color="error" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EditOperationDialog;