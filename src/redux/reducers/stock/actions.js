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
  payload: { stockData }
});

const AVAILABLE_STOCKS = [
  'bitcoin',
  'ethereum',
  'cardano',
  'dogecoin',
  'ripple',
  'polkadot',
  'uniswap',
  'chainlink',
  'litecoin',
  'stellar'
];
const BASE_STOCK = 'usd';
const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

const fetchStockData = async () => {
  const url = `${BASE_URL}?vs_currency=${BASE_STOCK}&ids=${AVAILABLE_STOCKS.join(',')}`;
  const { data } = await axios.get(url);
  return data;
};

export const getTickers = () => async (dispatch) => {
  dispatch(getStockInit());
  try {
    const data = await fetchStockData();
    dispatch(getStockSuccess(data));
  } catch (error) {
    dispatch(getStockFail(error));
  }
};
