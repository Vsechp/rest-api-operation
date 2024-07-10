import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOperations } from '../store/actions/operations';
import { RootState } from '../store';
import { Operation } from '../store/types/operations';
import { List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const OperationsList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { operations, loading, error } = useSelector((state: RootState) => state.operations);

  useEffect(() => {
    dispatch(getOperations());
  }, [dispatch]);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => history.push('/create-operation')}>
        Create Operation
      </Button>
      <List>
        {operations.map((operation: Operation) => (
          <ListItem key={operation.id} button onClick={() => history.push(`/operation/${operation.id}`)}>
            <ListItemText primary={operation.name} secondary={`Number: ${operation.number}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OperationsList;
