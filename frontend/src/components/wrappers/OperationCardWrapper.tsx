import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OperationCard from '../OperationCard';
import { Operation } from '../../types';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchOperationById } from '../../api/operations';

const OperationCardWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [operation, setOperation] = useState<Operation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOperation = async () => {
      try {
        setLoading(true);
        const data = await fetchOperationById(id!);
        setOperation(data);
      } catch (err) {
        setError('Ошибка при загрузке операции');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadOperation();
    }
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!operation) return <Typography>Операция не найдена</Typography>;

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f3f2f7', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <OperationCard operation={operation} />
      <Button component={RouterLink} to="/" color="primary" variant="contained" sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: '#5e35b1' }, marginTop: '10px' }}>
        Back to main
      </Button>
    </Box>
  );
};

export default OperationCardWrapper;