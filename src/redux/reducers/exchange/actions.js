import transactionService from '../../../services/transactionService';

export const EXCHANGE_MAKE_INIT = 'exchange/make/init';
export const EXCHANGE_MAKE_SUCCESS = 'exchange/make/success';
export const EXCHANGE_MAKE_FAILURE = 'exchange/make/failure';

export const makeExhangeInit = (transactionInfo) => ({
  type: EXCHANGE_MAKE_INIT,
  payload: { transactionInfo }
});

export const makeExhangeFail = (error) => ({
  type: EXCHANGE_MAKE_FAILURE,
  payload: { error }
});

export const makeExhangeSuccess = () => ({ type: EXCHANGE_MAKE_SUCCESS });

export const makeExchange = (transactionInfo) => async (dispatch) => {
  dispatch(makeExhangeInit(transactionInfo));
  try {
    await transactionService.exchange(transactionInfo);
    dispatch(makeExhangeSuccess());
  } catch (error) {
    dispatch(makeExhangeFail(error));
  }
};
