import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/index';
import { Operation } from '../types';
import { getOperations } from '../actions/operations';
import { getSuboperations, removeSuboperation } from '../actions/suboperations';
import { List, ListItem, ListItemText, CircularProgress, Button, Typography } from '@mui/material';
import { AppDispatch } from '../store/index'; 

const OperationCard: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { operations, loading, error } = useSelector((state: RootState) => state.operations);
  const { suboperations } = useSelector((state: RootState) => state.suboperations);

  useEffect(() => {
    dispatch(getOperations({ page: 1, search: '' }));
    dispatch(getSuboperations(id));
  }, [dispatch, id]);
  const operation = operations.find((op: Operation) => op.id === id);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  if (!operation) return <div>Operation not found</div>;

  const handleDeleteSuboperation = (subId: string) => {
    dispatch(removeSuboperation(subId));
  };

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
        {suboperations.map((sub) => (
          <ListItem key={sub.id}>
            <ListItemText primary={sub.name} secondary={`Number: ${sub.number}`} />
            <Button variant="contained" color="primary" onClick={() => { /* edit suboperation */ }}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleDeleteSuboperation(sub.id)}>
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
