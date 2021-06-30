import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import stock from './stock/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  stock
});

export default createRootReducer;
