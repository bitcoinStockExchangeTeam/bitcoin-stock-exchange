import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import currencyReducer from './currency';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  currencyReducer
});

export default createRootReducer;
