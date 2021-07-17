import { USERS_PROFILES } from '../utils/constants';
import database from '../utils/database';

export const getUserById = async (userId) => (
  (await database.getItem(USERS_PROFILES)).find((user) => user.userId === userId)
);

const updateFunds = async ({ userId, currencyName, newFunds }) => {
  const usersProfiles = await database.getItem(USERS_PROFILES);
  const userIndex = usersProfiles.findIndex((user) => user.userId === userId);

  usersProfiles[userIndex].funds[currencyName] = newFunds;

  await database.setItem(USERS_PROFILES, usersProfiles);
};

const walletService = {
  async getFunds({ userId, currencyName }) {
    const userFunds = (await getUserById(userId)).funds;
    return currencyName ? userFunds[currencyName] ?? 0 : userFunds;
  },

  async addFunds({ userId, currencyName, amount }) {
    const oldFunds = await walletService.getFunds({ userId, currencyName });
    const newFunds = oldFunds + amount;

    await updateFunds({ userId, currencyName, newFunds });
  },

  async subtractFunds({ userId, currencyName, amount }) {
    const oldFunds = await walletService.getFunds({ userId, currencyName });
    const newFunds = oldFunds - amount;

    await updateFunds({ userId, currencyName, newFunds });
  }
};

export default walletService;
