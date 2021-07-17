import localforage from 'localforage';
import { BASE_CURRENCY, USERS_PROFILES } from '../utils/constants';

export const addCurrency = (userProfile, currencyName, amount) => {
  userProfile.funds[currencyName] += amount;
};

export const getUserById = async (userId) => (
  (await localforage.getItem(USERS_PROFILES))
    ?.find((user) => user.userId === userId)
);

export default {
  async getAvailableUserFunds(userId, currencyName) {
    try {
      const userFunds = (await getUserById(userId))?.funds;
      return userFunds[currencyName] ?? 0;
    } catch (err) {
      console.log(err);
      return 0;
    }
  },
  async exchangeCurrency({ userId, currencyName, amount, price }) {
    try {
      const usersProfiles = await localforage.getItem(USERS_PROFILES);
      const userIndex = usersProfiles.findIndex((user) => user.userId === userId);

      if (userIndex === -1) {
        throw new Error('No such user in database');
      }

      addCurrency(usersProfiles[userIndex], BASE_CURRENCY, -amount * price);
      addCurrency(usersProfiles[userIndex], currencyName, amount);

      await localforage.setItem(USERS_PROFILES, usersProfiles);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
};
