const initialState = {
    operations: [],
    error: null,
  };
  
  const operationsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_OPERATIONS_SUCCESS':
        return {
          ...state,
          operations: action.payload,
          error: null,
        };
      case 'DELETE_OPERATION_SUCCESS':
        return {
          ...state,
          operations: state.operations.filter(operation => operation.id !== action.payload),
          error: null,
        };
      case 'OPERATION_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default operationsReducer;