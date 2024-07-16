import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperations, setPage } from '../actions/operations';
import { RootState } from '../store/index';
import { List, ListItem, ListItemText, CircularProgress, Button, TextField, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/index';

const OperationsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { operations, loading, error, totalCount, currentPage } = useSelector((state: RootState) => state.operations);
  const [search, setSearch] = useState('');
  const operationsPerPage = 10;
  const pageCount = Math.ceil(totalCount / operationsPerPage);

  useEffect(() => {
    dispatch(getOperations({ page: currentPage, search }));
  }, [dispatch, search, currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    dispatch(setPage(1));
    dispatch(getOperations({ page: 1, search: event.target.value }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
    dispatch(getOperations({ page: value, search }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => navigate('/create-operation')}>
        Create Operation
      </Button>
      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <List>
        {operations.map((operation) => (
          <ListItem key={operation.id} button onClick={() => navigate(`/operation/${operation.id}`)}>
            <ListItemText primary={operation.name} secondary={`Number: ${operation.number}`} />
          </ListItem>
        ))}
      </List>
      <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} />
    </div>
  );
};

export default OperationsList;
