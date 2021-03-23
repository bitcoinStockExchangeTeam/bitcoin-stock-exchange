import React from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { wrapper, heading, form, buttonContainer } from './transaction.module.scss';
import Text from '../../components/Text';

export default function Switches() {
  const [checked, setChecked] = React.useState(true);
  const [currency, setCurrency] = React.useState('');

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  const handleNameChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className={wrapper}>
      <div className={heading}>
        <Text text="Transaction Type:" type="HEADING_5" />
        <Text text={checked ? 'Buy' : 'Sell'} type="HEADING_5" state={checked ? 'SUCCESS' : 'ACCENT'} />
        <Switch
          checked={checked}
          onChange={handleCheckedChange}
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
          id="price"
          label="Price"
          variant="outlined"
        />
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
        />
        <TextField
          id="total"
          label="Total"
          variant="outlined"
        />
      </div>
      <div className={buttonContainer}>
        <Button variant="contained" color="primary">
          Confirm
        </Button>
        <Button variant="outlined" color="primary">
          Reset
        </Button>
      </div>
    </div>
  );
}
