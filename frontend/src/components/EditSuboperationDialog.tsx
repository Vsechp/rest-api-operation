import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Suboperation } from '../types';

interface EditSuboperationDialogProps {
  suboperation: Suboperation;
  onClose: () => void;
  onSave: (updatedSuboperation: Suboperation) => Promise<void>;
  onDelete?: () => void;
}

const EditSuboperationDialog: React.FC<EditSuboperationDialogProps> = ({ suboperation, onClose, onSave, onDelete }) => {
  const [name, setName] = useState(suboperation.name);

  const handleSubmit = async () => {
    const updatedSuboperation = { ...suboperation, name };
    await onSave(updatedSuboperation);
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
