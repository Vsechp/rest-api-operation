import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface OperationDeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    operationId: string;
    softDelete: boolean;
}

const OperationDeleteDialog: React.FC<OperationDeleteDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Delete Operation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this operation? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#5e35b1' } }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="secondary" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#5e35b1' }, ml: 2 }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OperationDeleteDialog;