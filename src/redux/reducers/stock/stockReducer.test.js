/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { StockBuilder } from '../../../utils/stockBuilder';
import * as actions from './actions';
import reducer, { initialState } from './reducer';

jest.mock('axios');

describe('Action creators', () => {
  it('should create an action to initialize a get stock data request', () => {
    const expectedAction = { type: actions.STOCK_GET_INIT };
    expect(actions.getStockInit()).toEqual(expectedAction);
  });

  it('should create an action to fail a get stock data request', () => {
    const error = 'Wrong argument';
    const expectedAction = {
      type: actions.STOCK_GET_FAILURE,
      payload: { error }
    };
    expect(actions.getStockFail(error)).toEqual(expectedAction);
  });

  it('should create an action to success a get stock data request', () => {
    const stockData = [];
    const expectedAction = {
      type: actions.STOCK_GET_SUCCESS,
      payload: { stockData }
    };
    expect(actions.getStockSuccess(stockData)).toEqual(expectedAction);
  });
});

describe('Async action creator', () => {
  const mockStore = configureMockStore([thunk]);

  const response = [['tBTCUSD', 36491, 15.304800269999998, 36506, 27.237893489999994, 4697, 0.1477, 36506, 17992.73308029, 36646, 31508]];

  const expectedSuccessActions = [
    { type: actions.STOCK_GET_INIT },
    { payload: { stockData: response }, type: actions.STOCK_GET_SUCCESS }
  ];

  const expectedFailureActions = [
    { type: actions.STOCK_GET_INIT },
    { payload: { error: 'Failed to fetch data' }, type: actions.STOCK_GET_FAILURE }
  ];

  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('creates STOCK_GET_SUCCESS when fetching stock data has been done', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));

    return store.dispatch(actions.getTickers()).then(() => {
      expect(store.getActions()).toEqual(expectedSuccessActions);
    });
  });

  it('creates STOCK_GET_FAILURE when fetching stock data failed', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject('Failed to fetch data'));

    return store.dispatch(actions.getTickers()).then(() => {
      expect(store.getActions()).toEqual(expectedFailureActions);
    });
  });
});

describe('Stock reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle STOCK_GET_INIT', () => {
    [initialState, {
      isLoading: false,
      isError: false,
      error: null,
      stockData: [new StockBuilder().build()]
    }].forEach((state) => {
      expect(
        reducer(state, actions.getStockInit())
      ).toEqual({
        ...initialState,
        isLoading: true,
        isError: false
      });
    });
  });

  it('should handle STOCK_GET_SUCCESS', () => {
    const { stockData, isLoading, isError, error } = reducer(
      initialState,
      actions.getStockSuccess(
        [['tBTCUSD', 36491, 15.304800269999998, 36506, 27.237893489999994, 4697, 0.1477, 36506, 17992.73308029, 36646, 31508]]
      )
    );

    const [{ name, change, price, cap }] = stockData;

    expect({ isLoading, isError, error })
      .toEqual({ isLoading: false, isError: false, error: null });

    expect({ name, change, price, cap })
      .toEqual({ name: 'BTC', change: 4697, price: 36506, cap: undefined });
  });

  it('should handle STOCK_GET_FAILURE', () => {
    expect(
      reducer(initialState, actions.getStockFail('Failed to fetch'))
    ).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
      error: 'Failed to fetch'
    });
  });
});
