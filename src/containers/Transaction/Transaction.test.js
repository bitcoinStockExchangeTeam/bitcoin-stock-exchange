import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Transaction, { errorMessages } from './Transaction';
import useStockExchangeData from '../../hooks/useStockExchangeData';

describe('Transaction', () => {
  const stockExchangeData = useStockExchangeData();

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
