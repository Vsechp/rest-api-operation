import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface SubOperationDeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    operationId: string;
    subOperationId: string;
    softDelete: boolean;
}

const SubOperationDeleteDialog: React.FC<SubOperationDeleteDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Удалить подоперацию</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите удалить эту подоперацию? Это действие нельзя отменить.
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

export default SubOperationDeleteDialog;