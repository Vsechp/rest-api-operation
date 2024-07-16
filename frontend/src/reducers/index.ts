import { combineReducers } from 'redux';
import operationsReducer from './operationsReducer';
import suboperationsReducer from './suboperationsReducer';

const rootReducer = combineReducers({
  operations: operationsReducer,
  suboperations: suboperationsReducer,

});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
