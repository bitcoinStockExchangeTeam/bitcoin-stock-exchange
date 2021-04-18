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

const Transaction = () => {
  const [checked, setType] = useState(true);
  const [amount, setAmount] = useState('');
  const [amountProps, setAmountProps] = useState({ error: false, helperText: '' });
  const [currenciesProps, setCurrenciesProps] = useState({ error: false });
  const [currency, setCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);

  const handleTypeChange = () => {
    setType((checkedPrev) => !checkedPrev);
  };

  const handleCurrencyChange = (event) => {
    if (event.target.value === '') {
      setCurrenciesProps({ error: true });
    } else {
      setCurrenciesProps({ error: false });
    }
    setCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    const regexDecimal = /^\d+\.\d{0,2}$/;
    const regexInt = /^\d+$/;

    if (regexDecimal.test(event.target.value) || regexInt.test(event.target.value)) {
      setAmountProps({ error: false, helperText: '' });
    } else {
      setAmountProps({ error: true, helperText: 'Input must be a number.' });
    }
    setAmount(event.target.value);
  };

  const handleConfirmButton = () => {
    if (currency === '') {
      setCurrenciesProps({ error: true });
    }
  };

  useEffect(() => {
    setCurrencies(['BTC', 'ETH', 'USDT', 'BNB']);
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
          disabled
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          onChange={handleAmountChange}
          {...amountProps}
        />
        <TextField
          id="total"
          label="Total"
          variant="outlined"
          disabled
        />
      </div>
      <div className={buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleConfirmButton}>
          Confirm
        </Button>
        <Button variant="outlined" color="primary">
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Transaction;
