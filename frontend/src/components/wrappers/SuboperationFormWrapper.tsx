import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index';
import { Button, TextField, Typography, Box, IconButton, Link } from '@mui/material';
import { addSuboperation } from '../../actions/suboperations';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link as RouterLink } from 'react-router-dom';

interface SuboperationFormWrapperProps {
  operationId: string;
  onClose: () => void;
}

const SuboperationFormWrapper: React.FC<SuboperationFormWrapperProps> = ({ operationId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [suboperations, setSuboperations] = useState([{ name: '', number: '' }]);
  const [error, setError] = useState<string | null>(null);

  const handleAddSuboperation = () => {
    setSuboperations([...suboperations, { name: '', number: '' }]);
  };

  const handleRemoveSuboperation = (index: number) => {
    setSuboperations(suboperations.filter((_, i) => i !== index));
  };

  const handleSuboperationChange = (index: number, field: string, value: string) => {
    const newSuboperations = suboperations.map((suboperation, i) =>
      i === index ? { ...suboperation, [field]: value } : suboperation
    );
    setSuboperations(newSuboperations);
  };

  const handleSubmit = async () => {
    setError(null);

    try {
      for (const suboperation of suboperations) {
        const newSuboperation = {
          ...suboperation,
          number: parseInt(suboperation.number),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
        };
        await dispatch(addSuboperation({ operationId, suboperation: newSuboperation })).unwrap();
      }
      onClose();
    } catch (err) {
      console.error('Error creating suboperations:', err);
      setError('An error occurred while creating the suboperations. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Suboperations</Typography>
      {suboperations.map((suboperation, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            label="Suboperation Name"
            value={suboperation.name}
            onChange={(e) => handleSuboperationChange(index, 'name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Suboperation Number"
            value={suboperation.number}
            onChange={(e) => handleSuboperationChange(index, 'number', e.target.value)}
            fullWidth
            margin="normal"
          />
          <IconButton onClick={() => handleRemoveSuboperation(index)} color="secondary">
            <RemoveIcon />
          </IconButton>
        </Box>
      ))}
      <Button onClick={handleAddSuboperation} startIcon={<AddIcon />} color="primary" variant="outlined">
        Add Suboperation
      </Button>
      <Box marginTop={2}>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Create Suboperations
        </Button>
        {}
        <Button component={RouterLink} to="/" color="secondary" variant="contained" style={{ marginLeft: '10px' }}>
          Вернуться на главную
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default SuboperationFormWrapper;