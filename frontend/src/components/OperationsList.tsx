import React, { useEffect, useState, useCallback } from 'react';
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
    console.log(`Fetching operations for page ${currentPage} with search term "${search}"`);
    dispatch(getOperations({ page: currentPage, search }));
  }, [dispatch, search, currentPage]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    dispatch(setPage(1));
  }, [dispatch]);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => navigate('/create-operation')} sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#5e35b1' } }}>
        Create Operation
      </Button>
      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
        sx={{ input: { color: 'purple' }, label: { color: 'gray' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'purple' }, '&:hover fieldset': { borderColor: '#5e35b1' }, '&.Mui-focused fieldset': { borderColor: '#5e35b1' } } }}
      />
      <List sx={{ bgcolor: '#f3f2f7' }}>
        {operations.map((operation) => (
          <ListItem key={operation.id} button onClick={() => navigate(`/operation/${operation.id}`)} sx={{ '&:hover': { backgroundColor: '#eaeaf0' } }}>
            <ListItemText primary={operation.name} secondary={`Number: ${operation.number}`} primaryTypographyProps={{ color: 'purple' }} />
          </ListItem>
        ))}
      </List>
      <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} sx={{ ul: { justifyContent: 'center' }, '.Mui-selected': { backgroundColor: 'purple', color: 'white' }, '.MuiPaginationItem-root': { color: 'purple' } }} />
    </div>
  );
};

export default OperationsList;