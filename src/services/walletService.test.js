import localforage from 'localforage';
import walletService, { addCurrency, getUserById } from './walletService';
import { USERS_PROFILES } from '../utils/constants';

const userProfile = {
  userId: 1,
  funds: {
    USD: 1,
    ETH: 100
  }
};

describe('Function to add currency to user\'s profile', () => {
  it('should add specified amount of currency to profile', () => {
    const amount = 5;
    addCurrency(userProfile, 'USD', amount);
    expect(userProfile.funds.USD).toBe(6);
  });

  it('should substract specified amount of currency to profile', () => {
    const amount = -5;
    addCurrency(userProfile, 'ETH', amount);
    expect(userProfile.funds.ETH).toBe(95);
  });
});

describe('Function to get user from database by id', () => {
  it('should get user sucessfully', async () => {
    await localforage.setItem(USERS_PROFILES, [userProfile]);
    expect(await getUserById(1)).toStrictEqual(userProfile);
  });

  it('should return undefined if there is no such user', async () => {
    expect(await getUserById(-1)).toBe(undefined);
  });
});

describe('Function to exchange currency', () => {
  beforeEach(async () => {
    userProfile.funds = {
      USD: 50,
      ETH: 100
    };
    await localforage.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should fail if user does not exist', async () => {
    expect(await walletService.exchangeCurrency({ userId: -1 })).toBe(false);
  });

  it('should buy currency successfully', async () => {
    expect(await walletService.exchangeCurrency({ userId: 1, currencyName: 'ETH', amount: 20, price: 1 })).toBe(true);
    expect((await localforage.getItem(USERS_PROFILES))[0].funds).toStrictEqual({ USD: 30, ETH: 120 });
  });

  it('should sell currency successfully', async () => {
    expect(await walletService.exchangeCurrency({ userId: 1, currencyName: 'ETH', amount: -20, price: 1 })).toBe(true);
    expect((await localforage.getItem(USERS_PROFILES))[0].funds).toStrictEqual({ USD: 70, ETH: 80 });
  });
});
