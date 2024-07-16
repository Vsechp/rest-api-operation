import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

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
      <DialogTitle>Удалить операцию</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите удалить эту операцию? Это действие нельзя отменить.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OperationDeleteDialog;