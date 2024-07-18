// OperationCard.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/index";
import { Operation, Suboperation } from "../types";
import {
  getOperations,
  removeOperation,
  forceRemoveOperation,
} from "../../src/actions/operations";
import { getSuboperations, removeSuboperation } from "../actions/suboperations";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Button,
  Typography,
} from "@mui/material";
import EditOperationDialog from "../../src/components/EditOperationDialog";
import EditSuboperationDialog from "../../src/components/EditSuboperationDialog";
import SuboperationFormWrapper from "../../src/components/wrappers/SuboperationFormWrapper";
import OperationDeleteDialog from "./OperationDeleteDialog";

interface OperationCardProps {
  onDelete?: (id: string) => void;
  operation: Operation;
}

const OperationCard: React.FC<OperationCardProps> = ({ onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { operations, loading, error } = useSelector(
    (state: RootState) => state.operations
  );
  const { suboperations } = useSelector(
    (state: RootState) => state.suboperations
  );
  const [isEditOperationOpen, setIsEditOperationOpen] = useState(false);
  const [isAddSuboperationOpen, setIsAddSuboperationOpen] = useState(false);
  const [editingSuboperation, setEditingSuboperation] =
    useState<Suboperation | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [softDelete, setSoftDelete] = useState(false);

  useEffect(() => {
    dispatch(getOperations({ page: 1, search: "" }) as any).unwrap();
    if (id) {
      dispatch(getSuboperations(id) as any).unwrap();
    }
  }, [dispatch, id]);

  const operation = operations.find((op: Operation) => op.id === id);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  if (!operation) return <div>Operation not found</div>;

  const handleOpenDeleteDialog = (isSoftDelete: boolean) => {
    setSoftDelete(isSoftDelete);
    setIsDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleDeleteOperation = () => {
    if (id) {
      if (softDelete) {
        dispatch(removeOperation(id) as any).unwrap();
      } else {
        dispatch(forceRemoveOperation(id) as any).unwrap();
      }
      handleCloseDeleteDialog();
      if (onDelete) onDelete(id);
    }
  };

  const handleDeleteSuboperation = (subId: string) => {
    dispatch(removeSuboperation(subId) as any).unwrap();
  };

  const handleEditSuboperation = (sub: Suboperation) => {
    setEditingSuboperation(sub);
  };

  const handleOperationSave = (updatedOperation: Operation) => {
    dispatch(getOperations({ page: 1, search: "" }) as any).unwrap();
  };

  return (
    <div>
      <Typography variant="h4">{operation.name}</Typography>
      <Typography variant="subtitle1">Number: {operation.number}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsEditOperationOpen(true)}
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
      <Button variant="contained" 
      onClick={() => handleOpenDeleteDialog(true)}
      sx={{ marginRight: 1 }}>
        Soft Delete Operation
      </Button>
      <List>
        {suboperations
          .filter((sub) => sub.operation_id === operation.id)
          .map((sub) => (
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
                onClick={() => handleDeleteSuboperation(sub.id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAddSuboperationOpen(true)}
      >
        Add Suboperation
      </Button>
      {isEditOperationOpen && (
        <EditOperationDialog
          operation={operation}
          onClose={() => setIsEditOperationOpen(false)}
          onSave={handleOperationSave}
        />
      )}
      {isAddSuboperationOpen && (
        <SuboperationFormWrapper
          operationId={operation.id}
          onClose={() => setIsAddSuboperationOpen(false)}
        />
      )}
      {editingSuboperation && (
        <EditSuboperationDialog
          suboperation={editingSuboperation}
          onClose={() => setEditingSuboperation(null)}
        />
      )}
      {isDeleteDialogOpen && (
        <OperationDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteOperation}
          operationId={id || ""}
          softDelete={softDelete}
        />
      )}
    </div>
  );
};

export default OperationCard;
