import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { editSuboperation } from '../actions/suboperations';
import { Suboperation } from '../types';
import { AppDispatch } from '../store/index';

interface EditSuboperationDialogProps {
  suboperation: Suboperation;
  onClose: () => void;
  onDelete?: () => void;
}

const EditSuboperationDialog: React.FC<EditSuboperationDialogProps> = ({ suboperation, onClose, onDelete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState(suboperation.name);

  const handleSubmit = () => {
    dispatch(editSuboperation({ id: suboperation.id, suboperation: { name } }));
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: '#f3e5f5' }}>Edit Suboperation</DialogTitle>
      <DialogContent sx={{ backgroundColor: '#f3e5f5' }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
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

export default EditSuboperationDialog;