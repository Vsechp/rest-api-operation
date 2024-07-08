import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import axios from 'axios';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  operationId: string; 
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm, operationId }) => {

  const handleDelete = async () => {
    try {
      await axios.delete(`https://your-api-url.com/operations/${operationId}`);
      onConfirm(); 
    } catch (error) {
      console.error('Error deleting operation:', error);

    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Operation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this operation? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;