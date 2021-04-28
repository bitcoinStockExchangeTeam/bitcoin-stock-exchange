import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import sampleReducer from './sampleReducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history)
  // sampleReducer
});

export default createRootReducer;
