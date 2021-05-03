import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import * as Component from '@material-ui/core';
import styles from './transaction.module.scss';
import Text from '../../components/Text';

const defaultValues = {
  isBuying: true,
  currencyName: '',
  price: '',
  amount: '',
  total: ''
};

const Transaction = ({ stockExchangeData }) => {
  const { reset, control, handleSubmit, watch, setValue, getValues } = useForm({ defaultValues });
  const [isBuying, currencyName, amount] = [watch('isBuying'), watch('currencyName'), watch('amount')];

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  useEffect(() => {
    setValue('price', stockExchangeData.find((dataItem) => dataItem.name === currencyName)?.price || '');
  }, [currencyName, setValue, stockExchangeData]);

  useEffect(() => {
    if (amount && currencyName) {
      setValue('total', stockExchangeData.find((dataItem) => dataItem.name === currencyName).price * getValues('amount'));
    }
  }, [amount, currencyName, getValues, setValue, stockExchangeData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div className={styles.heading}>
        <Text text="Transaction Type:" type="HEADING_5" />
        <Text text={isBuying ? 'Buy' : 'Sell'} type="HEADING_5" state={isBuying ? 'SUCCESS' : 'ACCENT'} />
        <Controller
          name="isBuying"
          control={control}
          render={({ field }) => (
            <Component.Switch
              color="primary"
              checked={field.value}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              {...field}
            />
          )}
        />
      </div>
      <div className={styles.form}>
        <Component.FormControl variant="outlined">
          <Component.InputLabel id="currencyName">Name</Component.InputLabel>
          <Controller
            name="currencyName"
            control={control}
            render={({ field }) => (
              <Component.Select
                labelId="currencyName"
                id="currencyName"
                label="currencyName"
                {...field}
              >
                {stockExchangeData.map((dataItem) => (
                  <Component.MenuItem key={dataItem.uuid} value={dataItem.name}>
                    {dataItem.name}
                  </Component.MenuItem>
                ))}
              </Component.Select>
            )}
          />
        </Component.FormControl>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Component.TextField
              id="price"
              label="Price"
              variant="outlined"
              disabled
              {...field}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Component.TextField
              id="amount"
              label="Amount"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="total"
          control={control}
          render={({ field }) => (
            <Component.TextField
              id="total"
              label="Total"
              variant="outlined"
              disabled
              {...field}
            />
          )}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Component.Button type="submit" variant="contained" color="primary">
          Confirm
        </Component.Button>
        <Component.Button variant="outlined" color="primary" onClick={() => reset(defaultValues)}>
          Reset
        </Component.Button>
      </div>
    </form>
  );
};

export default Transaction;

Transaction.propTypes = {
  stockExchangeData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    change: PropTypes.number,
    cap: PropTypes.number
  })).isRequired
};
