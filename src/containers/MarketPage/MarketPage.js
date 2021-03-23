import React from 'react';
import Transaction from '../Transaction';
import Table from '../CurrencyTable';
import { wrapper, table, transaction } from './marketPage.module.scss';

const MarketPage = () => (
  <div className={wrapper}>
    <div className={table}>
      <Table />
    </div>
    <div className={transaction}>
      <Transaction />
    </div>
  </div>
);

export default MarketPage;
