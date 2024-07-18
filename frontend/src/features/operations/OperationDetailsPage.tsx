import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid } from "@material-ui/core";
import SubOperationList from "../../features/operations/SubOperationList";
import SubOperationForm from "../../components/SuboperationForm";
import SubOperationDeleteDialog from "../../components/SuboperationDeleteDialog";

const OperationDetailsPage = () => {
  const { operationId } = useParams<{ operationId: string }>();
  const [operation, setOperation] = useState<any>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSubOperationId, setSelectedSubOperationId] = useState<string>(
    operationId ?? ""
  );
  const safeOperationId = operationId ?? "";

  useEffect(() => {
    const fetchOperation = async () => {
      try {
        const response = await fetch(`api/operations/${operationId}`);
        if (!response.ok) {
          throw new Error('Operation not found');
        }
        const data = await response.json();
        setOperation(data);
      } catch (error) {
        console.error('Failed to fetch operation:', (error as Error).message);

      }
    };

    fetchOperation();
  }, [operationId]);

  const handleOpenDeleteDialog = (subOperationId: string) => {
    setSelectedSubOperationId(subOperationId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    handleCloseDeleteDialog();
  };

  return (
    <Container>
      <Typography variant="h4">Детали операции</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SubOperationList
            SubOperation={operation?.subOperations || []}
            onDelete={(subOperationId: number) =>
              handleOpenDeleteDialog(subOperationId.toString())
            }
          />
        </Grid>
        <Grid item xs={12}>
          <SubOperationForm onSave={(data: any) => {}} operationId={safeOperationId} />
        </Grid>
      </Grid>
      <SubOperationDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        operationId={safeOperationId}
        subOperationId={selectedSubOperationId}
        softDelete={false}
      />
    </Container>
  );
};

export default OperationDetailsPage;
