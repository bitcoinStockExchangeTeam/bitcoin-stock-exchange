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
  const { isLoading, isError, stockData } = useSelector((state) => state.stock);
  const classes = useStyles();

  if (isLoading) {
    return <div className={classes.center}><CircularProgress /></div>;
  }

  if (isError) {
    return (
      <div className={classes.center}>
        <Text text="There was error when connecting to API. Please wait a couple of seconds and refresh the page." type="HEADING_4" state="ERROR" />
      </div>
    );
  }

  return <CurrencyTable stockExchangeData={stockData} />;
};

export default CurrencyTableWrapper;
