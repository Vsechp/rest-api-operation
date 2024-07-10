import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import OperationsList from './components/OperationsList';
import OperationCard from './components/OperationCard';
import OperationForm from './components/OperationForm';
import SuboperationForm from './components/SuboperationForm';

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Route path="/" component={OperationsList} />
        <Route path="/create-operation" component={OperationForm} />
        <Route path="/operation/:id" exact component={OperationCard} />
        <Route path="/operation/:operationId/create-suboperation" component={SuboperationForm} />
      </Container>
    </Router>
  );
};

export default App;
