import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(id, price, name, change, cap) {
  return { id, name, price, change, cap };
}

const rows = [
  createData(1, 'BTC', '184,406.98 PLN', '+4.90%', '3,444,312.55M PLN'),
  createData(2, 'ETH', '6,138.07 PLN', '+5.90%', '704,883.33M PLN'),
  createData(3, 'BNB', '938.31 PLN', '-3.1%', '144,583.29M PLN'),
  createData(4, 'USDT', '3.27 PLN', '-0.30%', '129,465.66M PLN'),
  createData(5, 'BTC', '184,406.98 PLN', '+4.90%', '3,444,312.55M PLN'),
  createData(6, 'BTC', '184,406.98 PLN', '+4.90%', '3,444,312.55M PLN'),
  createData(7, 'BTC', '184,406.98 PLN', '+4.90%', '3,444,312.55M PLN'),
  createData(8, 'BTC', '184,406.98 PLN', '+4.90%', '3,444,312.55M PLN'),
  createData(9, 'BTC', '184,406.98 PLN', '+4.90%', '3,444,312.55M PLN')
];

export default function CurrencyTable() {
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.change}</TableCell>
              <TableCell align="right">{row.cap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
