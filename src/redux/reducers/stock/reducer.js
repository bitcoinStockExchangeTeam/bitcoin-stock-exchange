import { StockBuilder } from '../../../utils/stockBuilder';
import { STOCK_GET_INIT, STOCK_GET_SUCCESS, STOCK_GET_FAILURE } from './actions';

export const initialState = {
  stockData: [],
  isLoading: true,
  isError: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case STOCK_GET_INIT: {
      return {
        ...state,
        stockData: initialState.stockData,
        isLoading: true,
        isError: false,
        error: initialState.error
      };
    }
    case STOCK_GET_SUCCESS: {
      return {
        ...state,
        stockData: action.payload.stockData.map(
          (item) => new StockBuilder()
            .setUuid()
            .setName(item[0])
            .setChange(item[5])
            .setPrice(item[7])
            .build()
        ),
        isLoading: false
      };
    }
    case STOCK_GET_FAILURE: {
      return {
        ...state,
        stockData: initialState.stockData,
        isLoading: false,
        isError: true,
        error: action.payload.error
      };
    }
    default:
      return state;
  }
};
