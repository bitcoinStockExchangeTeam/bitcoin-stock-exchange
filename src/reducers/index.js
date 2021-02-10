import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import counterReducer from './counter';
import loggedReducer from './isLogged';

const createRootReducer = (history) => combineReducers({ router: connectRouter(history),
  counterReducer,
  loggedReducer });

export default createRootReducer;
