import database from '../utils/database';
import walletService, { getUserById } from './walletService';
import { USERS_PROFILES } from '../utils/constants';
import { NO_SUCH_USER } from '../utils/errors';

const userProfile = {
  userId: 1,
  funds: {
    USD: 1,
    ETH: 100
  }
};

describe('getUserById function', () => {
  it('should get user sucessfully', async () => {
    await database.setItem(USERS_PROFILES, [userProfile]);
    expect(await getUserById(1)).toStrictEqual(userProfile);
  });

  it('should return undefined if there is no such user', async () => {
    expect(await getUserById(-1)).toBe(undefined);
  });
});

describe('getFunds function', () => {
  beforeAll(async () => {
    userProfile.funds = {
      USD: 50,
      ETH: 100
    };
    await database.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should return amount of currency correctly', async () => {
    expect(await walletService.getFunds({ userId: 1, currencyName: 'ETH' })).toBe(100);
  });

  it('should return 0 if user have no such currency', async () => {
    expect(await walletService.getFunds({ userId: 1, currencyName: 'BTC' })).toBe(0);
  });

  it('should return all funds', async () => {
    expect(await walletService.getFunds({ userId: 1 })).toStrictEqual({ USD: 50, ETH: 100 });
  });
});

describe('addFunds function', () => {
  beforeEach(async () => {
    userProfile.funds = {
      USD: 50,
      ETH: 100
    };
    await database.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should add currency successfully', async () => {
    await walletService.addFunds({ userId: 1, currencyName: 'ETH', amount: 20 });
    expect((await database.getItem(USERS_PROFILES))[0].funds).toStrictEqual({ USD: 50, ETH: 120 });
  });

  it('should throw error if user do not exists', async () => {
    expect(walletService.addFunds({ userId: -1 })).rejects.toThrow(NO_SUCH_USER);
  });
});

describe('subtractFunds function', () => {
  beforeEach(async () => {
    userProfile.funds = {
      USD: 50,
      ETH: 100
    };
    await database.setItem(USERS_PROFILES, [userProfile]);
  });

  it('should subtract currency successfully', async () => {
    await walletService.subtractFunds({ userId: 1, currencyName: 'USD', amount: 20 });
    expect((await database.getItem(USERS_PROFILES))[0].funds).toStrictEqual({ USD: 30, ETH: 100 });
  });

  it('should throw error if user do not exists', async () => {
    expect(walletService.addFunds({ userId: -1 })).rejects.toThrow(NO_SUCH_USER);
  });
});
