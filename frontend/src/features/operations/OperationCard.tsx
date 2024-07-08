import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@material-ui/core';

interface Operation {
  id: string;
  name: string;
}

interface OperationsState {
  operations: {
    list: Operation[];
  };
}

type OperationParams = {
  operationId: string;
};

const OperationCard = () => {
  const { operationId } = useParams<OperationParams>(); 
  const operation = useSelector((state: OperationsState) => 
    state.operations.list.find((op) => op.id === operationId)
  );

  if (!operation) return <div>Операция не найдена</div>;

  return (
    <Card>
      <CardContent>
      </CardContent>
    </Card>
  );
};

export default OperationCard;