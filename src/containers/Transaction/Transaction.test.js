import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Transaction, { errorMessages } from './Transaction';

const sampleData = [
  {
    name: 'BTC',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'ETH',
    price: 6138.07,
    change: 5.9,
    cap: 704883.33
  },
  {
    name: 'BNB',
    price: 938.31,
    change: -3.1,
    cap: 144583.29
  },
  {
    name: 'USDT',
    price: 3.27,
    change: -0.3,
    cap: 129465.66
  },
  {
    name: 'AAA',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'BBB',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'CCC',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'DDD',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  },
  {
    name: 'EEE',
    price: 184406.98,
    change: 4.9,
    cap: 3444312.55
  }
];

describe('Transaction', () => {
  const stockExchangeData = sampleData.map((data) => ({ uuid: uuidv4(), ...data }));

  beforeEach(() => {
    render(<Transaction stockExchangeData={stockExchangeData} />);
  });

  it('should display required error when values are empty', async () => {
    await act(async () => {
      fireEvent.input(screen.getByLabelText('Amount'), { target: { value: '' } });
      fireEvent.submit(screen.getByRole('button', { name: 'Confirm' }));
    });

    expect(screen.getAllByText(errorMessages.required)).toHaveLength(2);
  });

  it('should display positive number error when amount field is negative or neutral', async () => {
    const testValues = [0, -5];

    for await (const value of testValues) {
      await act(async () => {
        fireEvent.input(screen.getByLabelText('Amount'), { target: { value } });
        fireEvent.submit(screen.getByRole('button', { name: 'Confirm' }));
      });
      expect(screen.getByText(errorMessages.min)).toBeInTheDocument();
    }
  });

  it('should display integer error when amount field is not integer', async () => {
    await act(async () => {
      fireEvent.input(screen.getByLabelText('Amount'), { target: { value: 15.3 } });
      fireEvent.submit(screen.getByRole('button', { name: 'Confirm' }));
    });
    expect(screen.getByText(errorMessages.integer)).toBeInTheDocument();
  });

  it('should change transaction type when switch for transaction type is clicked', async () => {
    const prevValue = screen.getByRole('checkbox').value;
    await act(async () => {
      fireEvent.click(screen.getByRole('checkbox'));
    });
    expect(screen.getByRole('checkbox').value).not.toBe(prevValue);
  });

  it('should reset form when reset button is clicked', async () => {
    await act(async () => {
      fireEvent.input(screen.getByLabelText('Amount'), { target: { value: 15.3 } });
    });
    expect(screen.getByLabelText('Amount').value).toBe('15.3');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    });
    expect(screen.getByLabelText('Amount').value).toBe('0');
  });
});
