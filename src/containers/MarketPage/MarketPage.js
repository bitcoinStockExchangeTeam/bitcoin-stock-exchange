import React from 'react';
import { useDispatch } from 'react-redux';
import Transaction from '../Transaction';
import Table from '../../components/CurrencyTable';
import { wrapper, table, transaction } from './marketPage.module.scss';
import { getTickers } from '../../redux/reducers/stock/actions';

const MarketPage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTickers());
  }, []);

  return (
    <div className={wrapper}>
      <div className={table}>
        <Table />
      </div>
      <div className={transaction}>
        <Transaction />
      </div>
    </div>
  );
};

export default MarketPage;
