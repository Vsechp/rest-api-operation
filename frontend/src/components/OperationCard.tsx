import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';
import { Operation } from '../types';
import { getOperations } from '../store/actions/operations';
import { List, ListItem, ListItemText, CircularProgress, Button, Typography } from '@mui/material';

const OperationCard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { operations, loading, error } = useSelector((state: RootState) => state.operations);

  useEffect(() => {
    dispatch(getOperations());
  }, [dispatch]);

  const operation = operations.find((op: Operation) => op.id === id);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  if (!operation) return <div>Operation not found</div>;

  return (
    <div>
      <Typography variant="h4">{operation.name}</Typography>
      <Typography variant="subtitle1">Number: {operation.number}</Typography>
      <Button variant="contained" color="primary" onClick={() => { /* edit operation */ }}>
        Edit Operation
      </Button>
      <Button variant="contained" color="secondary" onClick={() => { /* delete operation */ }}>
        Delete Operation
      </Button>
      <List>
        {operation.suboperations.map((sub) => (
          <ListItem key={sub.id}>
            <ListItemText primary={sub.name} secondary={`Number: ${sub.number}`} />
            <Button variant="contained" color="primary" onClick={() => { /* edit suboperation */ }}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => { /* delete suboperation */ }}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={() => { /* create suboperation */ }}>
        Add Suboperation
      </Button>
    </div>
  );
};

export default OperationCard;
