import React from 'react';
import Transaction from './Transaction';
import useStockExchangeData from '../../hooks/useStockExchangeData';

const TransactionWrapper = () => {
  const stockExchangeData = useStockExchangeData();
  return <Transaction stockExchangeData={stockExchangeData} />;
};

export default TransactionWrapper;
