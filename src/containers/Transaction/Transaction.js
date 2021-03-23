import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: '2em',
    margin: 'auto 0',
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}));

export default function Switches() {
  const [checked, setChecked] = React.useState(true);
  const [currency, setCurrency] = React.useState('');

  const classes = useStyles();

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  const handleNameChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <p>
          <span>Transaction Type: </span>
          <span>{checked ? 'Buy' : 'Sell'}</span>
        </p>
        <Switch
          checked={checked}
          onChange={handleCheckedChange}
          color="primary"
          name="transactionType"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </div>
      <div className={classes.form}>
        <FormControl variant="outlined">
          <InputLabel id="currencies">Name</InputLabel>
          <Select
            labelId="currencies"
            id="currencies"
            value={currency}
            onChange={handleNameChange}
            label="Name"
          >
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
            <MenuItem value="BNB">BNB</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-helperText"
          label="Price"
          variant="outlined"
        />
        <TextField
          id="outlined-helperText"
          label="Amount"
          variant="outlined"
        />
        <TextField
          id="outlined-helperText"
          label="Total"
          variant="outlined"
        />
      </div>
    </div>
  );
}
