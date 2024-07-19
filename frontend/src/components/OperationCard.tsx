import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/index";
import { Operation, Suboperation } from "../types";
import { getOperationById, removeOperation, forceRemoveOperation, editOperation } from "../actions/operations";
import { removeSuboperation, editSuboperation } from "../actions/suboperations";
import { List, ListItem, ListItemText, CircularProgress, Button, Typography, Snackbar, Box } from "@mui/material";
import EditOperationDialog from "./EditOperationDialog";
import EditSuboperationDialog from "./EditSuboperationDialog";
import SuboperationFormWrapper from "./wrappers/SuboperationFormWrapper";
import OperationDeleteDialog from "./OperationDeleteDialog";
import SuboperationDeleteDialog from "./SuboperationDeleteDialog";

interface OperationCardProps {
  operation: Operation;
}

const OperationCard: React.FC<OperationCardProps> = ({ operation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isEditOperationOpen, setIsEditOperationOpen] = useState(false);
  const [isAddSuboperationOpen, setIsAddSuboperationOpen] = useState(false);
  const [editingSuboperation, setEditingSuboperation] = useState<Suboperation | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubOperationDeleteDialogOpen, setIsSubOperationDeleteDialogOpen] = useState(false);
  const [softDelete, setSoftDelete] = useState(false);
  const [subOperationToDelete, setSubOperationToDelete] = useState<Suboperation | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [localOperation, setLocalOperation] = useState(operation);

  if (!operation) return <CircularProgress />;

  const handleOpenDeleteDialog = (isSoftDelete: boolean) => {
    setSoftDelete(isSoftDelete);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleDeleteOperation = async () => {
    if (operation.id) {
      try {
        if (softDelete) {
          await dispatch(removeOperation(operation.id)).unwrap();
        } else {
          await dispatch(forceRemoveOperation(operation.id)).unwrap();
        }
        handleCloseDeleteDialog();
        setSnackbarMessage("Operation deleted successfully.");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        const status = (error as any).status;
        setSnackbarMessage(status === 409 ? "Cannot delete operation while suboperations exist." : "Cannot delete operation while suboperations exist.");
      }
    }
  };

  const handleDeleteSuboperation = async (sub: Suboperation) => {
    try {
      await dispatch(removeSuboperation(sub.id)).unwrap();
      setSnackbarMessage("Suboperation deleted successfully.");
      // Refresh operation data from server
      const updatedOperation = await dispatch(getOperationById(operation.id)).unwrap();
      setLocalOperation(updatedOperation);
    } catch (error) {
      setSnackbarMessage("Error deleting suboperation. Please try again.");
    }
  };

  const handleConfirmSubOperationDelete = () => {
    if (subOperationToDelete) {
      handleDeleteSuboperation(subOperationToDelete);
      setIsSubOperationDeleteDialogOpen(false);
    }
  };

  const handleEditSuboperation = async (sub: Suboperation) => {
    setEditingSuboperation(sub);
  };

  const handleSaveEditSuboperation = async (updatedSuboperation: Suboperation) => {
    try {
      await dispatch(editSuboperation({ id: updatedSuboperation.id, suboperation: updatedSuboperation })).unwrap();
      setSnackbarMessage("Suboperation updated successfully.");
      // Refresh operation data from server
      const updatedOperation = await dispatch(getOperationById(operation.id)).unwrap();
      setLocalOperation(updatedOperation);
      setEditingSuboperation(null);
    } catch (error) {
      setSnackbarMessage("Error updating suboperation. Please try again.");
    }
  };

  const handleEditOperation = () => {
    setIsEditOperationOpen(true);
  };

  const handleSaveEditOperation = async (updatedOperation: Operation) => {
    try {
      await dispatch(editOperation({ id: updatedOperation.id, operation: updatedOperation })).unwrap();
      setSnackbarMessage("Operation updated successfully.");
      // Refresh operation data from server
      const refreshedOperation = await dispatch(getOperationById(updatedOperation.id)).unwrap();
      setLocalOperation(refreshedOperation);
      setIsEditOperationOpen(false);
    } catch (error) {
      setSnackbarMessage("Error updating operation. Please try again.");
    }
  };

  const handleAddSuboperation = () => {
    setIsAddSuboperationOpen(true);
  };

  const handleAddSuboperationSuccess = async () => {
    const updatedOperation = await dispatch(getOperationById(operation.id)).unwrap();
    setLocalOperation(updatedOperation);
  };

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant="h4">{localOperation.name}</Typography>
        <Typography variant="subtitle1">Number: {localOperation.number}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditOperation}
          sx={{ marginRight: 1 }}
        >
          Edit Operation
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenDeleteDialog(false)}
          sx={{ marginRight: 1 }}
        >
          Delete Operation
        </Button>
        <Button
          variant="contained"
          onClick={() => handleOpenDeleteDialog(true)}
          sx={{ marginRight: 1 }}
        >
          Soft Delete Operation
        </Button>
      </Box>
      <List>
        {localOperation.suboperations.map((sub) => (
          <ListItem key={sub.id}>
            <ListItemText
              primary={sub.name}
              secondary={`Number: ${sub.number}`}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditSuboperation(sub)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setSubOperationToDelete(sub);
                setIsSubOperationDeleteDialogOpen(true);
              }}
              sx={{ marginLeft: 1 }}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Box marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSuboperation}
        >
          Add Suboperation
        </Button>
        {isAddSuboperationOpen && (
          <SuboperationFormWrapper
            operationId={operation.id}
            onClose={() => setIsAddSuboperationOpen(false)}
            onSuccess={handleAddSuboperationSuccess}
          />
        )}
      </Box>
      {isEditOperationOpen && (
        <EditOperationDialog
          operation={localOperation}
          onClose={() => setIsEditOperationOpen(false)}
          onSave={handleSaveEditOperation}
        />
      )}
      {editingSuboperation && (
        <EditSuboperationDialog
          suboperation={editingSuboperation}
          onClose={() => setEditingSuboperation(null)}
          onSave={handleSaveEditSuboperation}
        />
      )}
      {isDeleteDialogOpen && (
        <OperationDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteOperation}
          operationId={operation.id}
          softDelete={softDelete}
        />
      )}
      {isSubOperationDeleteDialogOpen && subOperationToDelete && (
        <SuboperationDeleteDialog
          isOpen={isSubOperationDeleteDialogOpen}
          onClose={() => setIsSubOperationDeleteDialogOpen(false)}
          onConfirm={handleConfirmSubOperationDelete}
          operationId={operation.id}
          subOperationId={subOperationToDelete.id}
          softDelete={false}
        />
      )}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default OperationCard;
