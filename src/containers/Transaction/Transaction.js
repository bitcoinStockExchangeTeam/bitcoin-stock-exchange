import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { wrapper, heading, form, buttonContainer } from './transaction.module.scss';
import Text from '../../components/Text';
import useStockExchangeData from '../../hooks/useStockExchangeData';

const Transaction = () => {
  const [checked, setType] = useState(true);
  const [currency, setCurrency] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');

  const [amountProps, setAmountProps] = useState({ error: false, helperText: '' });
  const [currenciesProps, setCurrenciesProps] = useState({ error: false });

  const [currencies, setCurrencies] = useState([]);
  const stockExchangeData = useStockExchangeData();

  const handleTypeChange = () => {
    setType((checkedPrev) => !checkedPrev);
  };

  const handleCurrencyChange = (event) => {
    setCurrenciesProps({ error: false });
    setCurrency(event.target.value);
    const currPrice = stockExchangeData.find(
      (dataItem) => dataItem.name === event.target.value
    ).price;
    setPrice(currPrice);
    if (amount !== '') {
      setTotal(amount * currPrice);
    }
  };

  const handleAmountChange = (event) => {
    const regexInt = /^\d+$/;

    if (regexInt.test(event.target.value)) {
      setAmountProps({ error: false, helperText: '' });
      setAmount(event.target.value);
      if (price !== '') {
        setTotal(event.target.value * price);
      }
    } else {
      setAmountProps({ error: true, helperText: 'Input must be an integer number.' });
      setAmount('');
    }
  };

  const handleConfirmButton = () => {
    if (currency === '') {
      setCurrenciesProps({ error: true });
    }
    if (amount === '') {
      setAmountProps({ error: true, helperText: 'Input must be an integer number.' });
    }
  };

  const resetForm = () => {
    setType(true);
    setCurrency('');
    setPrice('');
    setAmount('');
    setTotal('');
    setAmountProps({ error: false, helperText: '' });
    setCurrenciesProps({ error: false });
  };

  useEffect(() => {
    setCurrencies(stockExchangeData.map((dataItem) => dataItem.name));
  }, []);

  return (
    <div className={wrapper}>
      <div className={heading}>
        <Text text="Transaction Type:" type="HEADING_5" />
        <Text text={checked ? 'Buy' : 'Sell'} type="HEADING_5" state={checked ? 'SUCCESS' : 'ACCENT'} />
        <Switch
          checked={checked}
          onChange={handleTypeChange}
          color="primary"
          name="transactionType"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
      <div className={form}>
        <FormControl variant="outlined">
          <InputLabel id="currencies">Name</InputLabel>
          <Select
            labelId="currencies"
            id="currencies"
            value={currency}
            onChange={handleCurrencyChange}
            label="Name"
            {...currenciesProps}
          >
            {currencies.map((currencyItem) => (
              <MenuItem key={currencyItem} value={currencyItem}>{currencyItem}</MenuItem>))}
          </Select>
        </FormControl>
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          value={price}
          disabled
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          onChange={handleAmountChange}
          value={amount}
          {...amountProps}
        />
        <TextField
          id="total"
          label="Total"
          variant="outlined"
          value={total}
          disabled
        />
      </div>
      <div className={buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleConfirmButton}>
          Confirm
        </Button>
        <Button variant="outlined" color="primary" onClick={resetForm}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
