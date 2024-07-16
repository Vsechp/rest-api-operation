import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Button,
  TablePagination,
  CircularProgress,
  Snackbar,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import OperationCard from "../../components/OperationCard";
import { Operation } from "../../types"

const OperationListPage = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [totalOperations, setTotalOperations] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [operationName, setOperationName] = useState("");

  useEffect(() => {
    fetchOperations();
  }, [currentPage, rowsPerPage, filters]);

  const fetchOperations = async () => {
    setIsLoading(true);
    try {
      const queryParams = `?page=${currentPage + 1}&limit=${rowsPerPage}`;
      const response = await fetch(`http://localhost:8080/operations${queryParams}`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      const data = await response.json();
      setOperations(data.operations);
      setTotalOperations(data.total);
      setIsLoading(false);
      setError(null);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message as string);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleCreateOperation = async () => {
    try {
      const response = await fetch('http://localhost:8080/operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: operationName }),
      });
      if (!response.ok) {
        throw new Error('Ошибка создания операции');
      }
      setCreateDialogOpen(false);
      setOperationName('');
      fetchOperations(); 
    } catch (error: any) {
      setError(error.message as string);
    }
  };

  const handleDeleteOperation = async (operationId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/operations/${operationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Ошибка удаления операции');
      }
      fetchOperations(); 
    } catch (error: any) {
      setError(error.message as string);
    }
  };

  const handleSnackbarClose = () => {
    setError(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: event.target.value });
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          operations.map((operation) => (
            <Grid item xs={12} sm={6} md={4} key={operation.id}>
              <Paper>
                <OperationCard
                  {...{operation}}
                  onDelete={() => handleDeleteOperation(operation.id ?? '')}
                  operation={{ ...operation, id: operation.id ?? '' }}
                />
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
      <Button onClick={() => setCreateDialogOpen(true)}>Создать операцию</Button>
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Создание операции</DialogTitle>
        <DialogContent>
          <TextField
            label="Название операции"
            value={operationName}
            onChange={(e) => setOperationName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Отмена</Button>
          <Button onClick={handleCreateOperation} color="primary">Создать</Button>
        </DialogActions>
      </Dialog>
      <TablePagination
        component="div"
        count={totalOperations}
        page={currentPage}
        onPageChange={(event, newPage) => handleChangePage(event, newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={error}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default OperationListPage;
