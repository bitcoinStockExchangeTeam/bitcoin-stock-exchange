import React from 'react';
import { useSelector } from 'react-redux';
import Transaction from './Transaction';

const TransactionWrapper = () => {
  const stockState = useSelector((state) => state.stock);
  return <Transaction stockExchangeData={stockState.stockData} />;
};

export default TransactionWrapper;
