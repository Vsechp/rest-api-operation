import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import OperationsList from './components/OperationsList';
import OperationCardWrapper from './components/wrappers/OperationCardWrapper';
import CreateOperationComponent from './components/CreateOperationComponent';
import SuboperationFormWrapper from './components/wrappers/SuboperationFormWrapper';

const App: React.FC = () => {
  const [operationId, setOperationId] = useState<string | null>(null);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<OperationsList />} />
          <Route path="/create-operation" element={
            <div>
              <CreateOperationComponent onOperationCreated={setOperationId} />
              {operationId && (
                <SuboperationFormWrapper 
                  operationId={operationId} 
                  onClose={() => setOperationId(null)} 
                  onSuccess={() => console.log('Suboperation added successfully')} // Добавляем onSuccess пропс
                />
              )}
            </div>
          } />
          <Route path="/operation/:id" element={<OperationCardWrapper />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
