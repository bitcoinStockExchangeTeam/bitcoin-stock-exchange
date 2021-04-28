import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Component from '@material-ui/core';
import styles from './transaction.module.scss';
import Text from '../../components/Text';
import useStockExchangeData from '../../hooks/useStockExchangeData';

const defaultValues = {
  transactionType: true,
  price: '',
  amount: '',
  total: '',
  currencies: ''
};

const Transaction = () => {
  const { reset, control, handleSubmit, watch } = useForm({ defaultValues });
  const currencyNames = useStockExchangeData().map((dataItem) => dataItem.name);

  const onSubmit = (data) => {
    console.log(data);
  };

  const transactionType = watch('transactionType');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <div className={styles.heading}>
        <Text text="Transaction Type:" type="HEADING_5" />
        <Text text={transactionType ? 'Buy' : 'Sell'} type="HEADING_5" state={transactionType ? 'SUCCESS' : 'ACCENT'} />
        <Controller
          name="transactionType"
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
          <Component.InputLabel id="currencies">Name</Component.InputLabel>
          <Controller
            name="currencies"
            control={control}
            render={({ field }) => (
              <Component.Select
                labelId="currencies"
                id="currencies"
                label="Name"
                {...field}
              >
                {currencyNames.map((currencyItem) => (
                  <Component.MenuItem key={currencyItem} value={currencyItem}>
                    {currencyItem}
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
              // value={price}
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
              // value={amount}
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
              // value={total}
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
