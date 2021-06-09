import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CurrencyTable from './CurrencyTable';
import Text from '../Text';

const useStyles = makeStyles(() => ({
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const CurrencyTableWrapper = () => {
  const stockState = useSelector((state) => state.stock);
  const classes = useStyles();

  if (stockState.isLoading) {
    return <div className={classes.center}><CircularProgress /></div>;
  }

  if (stockState.isError) {
    return (
      <div className={classes.center}>
        <Text text="There was error when connecting to API. Please wait a couple of seconds and refresh the page." type="HEADING_4" state="ERROR" />
      </div>
    );
  }

  return <CurrencyTable stockExchangeData={stockState.stockData} />;
};

export default CurrencyTableWrapper;
