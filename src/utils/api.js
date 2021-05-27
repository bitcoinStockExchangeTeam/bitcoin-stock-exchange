/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const BASE_URL = 'https://api-pub.bitfinex.com/v2/';

export const getTickers = async (symbols) => {
  const { data } = await axios.get(
    `${BASE_URL}tickers?symbols=${symbols.map((symbol) => (symbol === 'ALL' ? symbol : `f${symbol}`)).join(',')}`
  );
  return data;
};
