import database from '../utils/database';
import walletService from './walletService';
import { validateIfUserHasSufficientFunds, exchangeCrypto } from './transactionService';
import { USERS_PROFILES, BASE_CURRENCY } from '../utils/constants';
import { NOT_ENOUGH_FUNDS } from '../utils/errors';

const userProfile = {
  userId: 1,
  funds: {
    ETH: 5,
    [BASE_CURRENCY]: 10
  }
};

describe('validateIfUserHasSufficientFunds function', () => {
  beforeAll(async () => {
    await database.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should not throw error when user have enough funds to buy crypto', async () => {
    expect(validateIfUserHasSufficientFunds({
      userId: 1,
      wallet: walletService,
      currencyName: 'ETH',
      amountToPay: 2
    })).resolves.not.toThrow();

    expect(validateIfUserHasSufficientFunds({
      userId: 1,
      wallet: walletService,
      currencyName: 'ETH',
      amountToPay: 5
    })).resolves.not.toThrow();
  });

  it('should throw error when user do not have enough funds to buy crypto', async () => {
    expect(validateIfUserHasSufficientFunds({
      userId: 1,
      wallet: walletService,
      currencyName: 'ETH',
      amountToPay: 10
    })).rejects.toThrow(new Error(NOT_ENOUGH_FUNDS));
  });
});

describe('exchangeCrypto function', () => {
  beforeEach(async () => {
    await database.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should correctly exchange currency', async () => {
    await exchangeCrypto({
      userId: 1,
      wallet: walletService,
      currencyToBuy: 'ETH',
      currencyToPay: BASE_CURRENCY,
      amountToBuy: 5,
      amountToPay: 10
    });

    expect((await database.getItem(USERS_PROFILES))[0].funds).toStrictEqual({ ETH: 10, [BASE_CURRENCY]: 0 });
  });

  it('should throw error if user do not have enough funds', async () => {
    expect(exchangeCrypto({
      userId: 1,
      wallet: walletService,
      currencyToBuy: 'ETH',
      currencyToPay: BASE_CURRENCY,
      amountToBuy: 5,
      amountToPay: 15
    })).rejects.toThrow(new Error(NOT_ENOUGH_FUNDS));
  });
});
