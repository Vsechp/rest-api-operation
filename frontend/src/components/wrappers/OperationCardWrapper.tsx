import React from 'react';
import { useParams } from 'react-router-dom';
import OperationCard from '../OperationCard';
import { Operation } from '../../types';
import { Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; 

const OperationCardWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const operation: Operation = {
    id: id || '',
    name: 'Sample Operation',
    number: 0,
    suboperations: [],
    created_at: '',
    updated_at: '',
    deleted_at: '',
  };

  return (
    <Box>
      <OperationCard operation={operation} />
      {}
      <Button component={RouterLink} to="/" color="primary" variant="contained" style={{ marginTop: '10px' }}>
        Вернуться на главную
      </Button>
    </Box>
  );
};

export default OperationCardWrapper;