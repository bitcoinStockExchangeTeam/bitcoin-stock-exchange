import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStockExchangeData from '../../hooks/useStockExchangeData';
import colors from '../../colors';

const roundNumber = (number) => (Math.round(number * 100) / 100).toFixed(2);

const formatIntegerPart = (number) => {
  const integerNumbers = number.split('.')[0].split('');

  let i = 0;
  const numberFormatted = integerNumbers.reduceRight((acc, curr) => (
    ((++i % 3 === 0 && i !== integerNumbers.length) ? `,${curr}` : curr).concat(acc)
  ), '');

  return `${numberFormatted}.${number.split('.')[1]}`;
};

const formatPrice = (price) => {
  const priceRounded = roundNumber(price);
  const priceFormatted = formatIntegerPart(priceRounded);

  return `${priceFormatted} PLN`;
};

const formatChange = (change) => {
  const changeRounded = roundNumber(change);
  return changeRounded >= 0 ? `+${changeRounded}%` : `${changeRounded}%`;
};

const formatCap = (cap) => {
  const capRounded = roundNumber(cap);
  const capFormatted = formatIntegerPart(capRounded);

  return `${capFormatted}M PLN`;
};

const formatStockExchangeData = (stockExchangeData) => (
  stockExchangeData.map((dataItem) => (
    {
      ...dataItem,
      price: formatPrice(dataItem.price),
      change: formatChange(dataItem.change),
      cap: formatCap(dataItem.cap)
    }
  ))
);

const CurrencyTable = () => {
  const stockExchangeData = useStockExchangeData();
  const stockExchangeDataFormatted = formatStockExchangeData(stockExchangeData);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Current Price</TableCell>
            <TableCell align="right">24h Change</TableCell>
            <TableCell align="right">Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockExchangeDataFormatted.map((dataItem) => (
            <TableRow key={dataItem.name}>
              <TableCell component="th" scope="row">{dataItem.name}</TableCell>
              <TableCell align="right">{dataItem.price}</TableCell>
              <TableCell style={dataItem.change[0] === '+' ? { color: colors.success } : { color: colors.error }} align="right">
                {dataItem.change}
              </TableCell>
              <TableCell align="right">{dataItem.cap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CurrencyTable;
