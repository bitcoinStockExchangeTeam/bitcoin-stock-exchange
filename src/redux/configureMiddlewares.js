import registerTransaction from './middlewares/transactionRegister';
import { EXCHANGE_MAKE_INIT } from './reducers/exchange/actions';

const exchangeMiddleware = () => (next) => (action) => {
  if (action.type === EXCHANGE_MAKE_INIT) {
    registerTransaction(action.payload.transactionInfo);
  }

  next(action);
};

export default [exchangeMiddleware];
