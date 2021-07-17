import transactionService from '../services/transactionService';
import { EXCHANGE_MAKE_INIT } from './reducers/exchange/actions';

const exchangeMiddleware = () => (next) => (action) => {
  if (action.type === EXCHANGE_MAKE_INIT) {
    transactionService.registerExchangeQuery(action.payload.transactionInfo);
  }

  next(action);
};

export default [exchangeMiddleware];
