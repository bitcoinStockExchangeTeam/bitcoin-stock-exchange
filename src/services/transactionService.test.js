import localforage from 'localforage';
import transactionService, { isUserBuying, isBaseCurrencySufficient } from './transactionService';
import { USERS_PROFILES, TRANSACTIONS_HISTORY_KEY } from '../utils/constants';

describe('isUserBuying function', () => {
  it('should return true if user buys currency', () => {
    expect(isUserBuying(12)).toBe(true);
  });

  it('should return false if user sells currency', () => {
    expect(isUserBuying(-7)).toBe(false);
  });
});

const userProfile = {
  userId: 1,
  funds: {
    USD: 5,
    ETH: 5
  }
};

const transactionInfoWithLessAmount = { userId: 1, currencyName: 'ETH', amount: 5, price: 1 };
const transactionInfoWithMoreAmount = { userId: 1, currencyName: 'ETH', amount: 10, price: 1 };

describe('isBaseCurrencySufficient function', () => {
  beforeAll(async () => {
    await localforage.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should return true if user have enough currency to buy crypto', async () => {
    expect(await isBaseCurrencySufficient(transactionInfoWithLessAmount)).toBe(true);
  });

  it('should return false if user do not have enough currency to buy crypto', async () => {
    expect(await isBaseCurrencySufficient(transactionInfoWithMoreAmount)).toBe(false);
  });
});

describe('isCryptocurrencySufficient function', () => {
  beforeAll(async () => {
    await localforage.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should return true if user have enough crypto to sell', async () => {
    expect(await isBaseCurrencySufficient(transactionInfoWithLessAmount)).toBe(true);
  });

  it('should return false if user do not have enough crypto to sell', async () => {
    expect(await isBaseCurrencySufficient(transactionInfoWithMoreAmount)).toBe(false);
  });
});

describe('registerExchangeQuery function', () => {
  beforeEach(async () => {
    await localforage.clear();
  });

  it('should save information with datastamp about incoming transaction', async () => {
    await transactionService.registerExchangeQuery(transactionInfoWithLessAmount);
    const [{ amount, currencyName, price, time, userId }] = await localforage.getItem(TRANSACTIONS_HISTORY_KEY);
    expect({ amount, currencyName, price, userId })
      .toStrictEqual(transactionInfoWithLessAmount);
    expect(time)
      .toBeDefined();
  });

  it('should not delete a history of the other transations', async () => {
    await transactionService.registerExchangeQuery(transactionInfoWithLessAmount);
    await transactionService.registerExchangeQuery(transactionInfoWithMoreAmount);
    expect(await localforage.getItem(TRANSACTIONS_HISTORY_KEY)).toHaveLength(2);
  });
});

// describe('exchange function', () => {

// });
