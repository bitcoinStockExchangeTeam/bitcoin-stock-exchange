import React from 'react';
import Transaction from '../Transaction';
import Table from '../Table';
import './wrapper.scss';

const Wrapper = () => (
  <div className="wrapper">
    <Table className="table" />
    <Transaction />
  </div>
);

export default Wrapper;
