import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';

interface Operation {
  id: string;
  name: string;
  amount: number;
}

const OperationsList: React.FC = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const response = await fetch('https://example.com/api/operations');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        setOperations(data);
      } catch (error) {
        if (error instanceof Error) { // Уточняем тип ошибки
          setError(error.message);
        } else {
          setError('Неизвестная ошибка');
        }
      }
    };

    fetchOperations();
  }, []);

  const deleteOperation = async (id: string) => {
    try {
      const response = await fetch(`https://example.com/api/operations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Ошибка удаления операции');
      }
      setOperations(operations.filter(operation => operation.id !== id));
    } catch (error) {
      if (error instanceof Error) { // Уточняем тип ошибки
        setError(error.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {operations.map((operation) => (
          <ListItem key={operation.id}>
            <ListItemText primary={operation.name} secondary={`Сумма: ${operation.amount}`} />
            <IconButton edge="end" aria-label="delete" onClick={() => deleteOperation(operation.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OperationsList;