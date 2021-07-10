import localforage from 'localforage';
import { BASE_CURRENCY, USERS_PROFILES } from '../utils/constants';

const changeUserCurrencyAmount = (userProfile, currencyName, amount) => {
  userProfile.funds.set(
    BASE_CURRENCY,
    userProfile.funds.get(currencyName) + amount
  );
};

const exchangeCurrency = async ({ userId, currencyName, amount, price }, isUserBuying) => {
  try {
    const usersProfiles = await localforage.getItem(USERS_PROFILES);
    const userIndex = usersProfiles.findIndex((user) => user.userId === userId);

    changeUserCurrencyAmount(usersProfiles[userIndex], BASE_CURRENCY, amount * isUserBuying ? 1 : -1);
    changeUserCurrencyAmount(usersProfiles[userIndex], currencyName, amount * price * isUserBuying ? -1 : 1);

    await localforage.setItem((USERS_PROFILES, usersProfiles));

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getUserById = async (userId) => (
  (await localforage.getItem(USERS_PROFILES))
    .find((user) => user.userId === userId)
);

export default {
  async getAvailableUserFunds(userId, currencyName) {
    try {
      const userFunds = (await getUserById(userId)).funds;
      return userFunds.get(currencyName) ?? 0;
    } catch (err) {
      console.log(err);
      return 0;
    }
  },

  async buyCurrency(transactionInfo) {
    return exchangeCurrency(transactionInfo, true);
  },

  async sellCurrency(transactionInfo) {
    return exchangeCurrency(transactionInfo, false);
  }
};

// const user = {
//   userId: 0,
//   funds: {
//     USD: 1,
//     ETH: 100
//   }
// }
