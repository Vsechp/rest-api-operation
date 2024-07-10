import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { SubOperation } from "../../components/OperationForm";

const SubOperationList = ({ SubOperation, onDelete }: { SubOperation: SubOperation[], onDelete: (id: number) => void }) => (
  <List>
    {SubOperation.map((subOperation) => (
      <ListItem key={subOperation.id}>
        <ListItemText primary={subOperation.name} />
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(Number(subOperation.id))}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>
);

export default SubOperationList;