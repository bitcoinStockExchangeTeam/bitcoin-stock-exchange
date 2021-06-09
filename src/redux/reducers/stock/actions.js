import axios from 'axios';

export const STOCK_GET_INIT = 'stock/get/init';
export const STOCK_GET_SUCCESS = 'stock/get/success';
export const STOCK_GET_FAILURE = 'stock/get/failure';

export const getStockInit = () => ({ type: STOCK_GET_INIT });

export const getStockFail = (error) => ({
  type: STOCK_GET_FAILURE,
  payload: { error }
});

export const getStockSuccess = (stockData) => ({
  type: STOCK_GET_SUCCESS,
  payload: stockData
});

const AVAILABLE_STOCKS = ['BTC', 'ETH', 'ADA', 'DOGE', 'XRP', 'DOT', 'UNI', 'LINK', 'LTC', 'XLM'];
const BASE_STOCK = 'USD';
const BASE_URL = 'https://api-pub.bitfinex.com/v2/';

const parseDifferentSymbolLengths = (symbol) => (symbol.length > 3 ? `t${symbol}:${BASE_STOCK}` : `t${symbol}${BASE_STOCK}`);

const createQueryParameter = () => AVAILABLE_STOCKS.map((symbol) => parseDifferentSymbolLengths(symbol)).join(',');

const fetchStockData = async () => {
  const { data } = await axios.get(
    `${BASE_URL}tickers?symbols=${createQueryParameter()}`
  );
  return data;
};

export const getTickers = () => async (dispatch) => {
  dispatch(getStockInit());
  try {
    const data = await fetchStockData();
    dispatch(getStockSuccess(data));
    return data;
  } catch (error) {
    dispatch(getStockFail(error));
    return error;
  }
};
