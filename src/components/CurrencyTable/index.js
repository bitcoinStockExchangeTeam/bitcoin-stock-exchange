import React from 'react';
import { useSelector } from 'react-redux';
import CurrencyTable from './CurrencyTable';

const CurrencyTableWrapper = () => {
  const stockState = useSelector((state) => state.stock);
  return <CurrencyTable stockExchangeData={stockState.stockData} />;
};

export default CurrencyTableWrapper;
