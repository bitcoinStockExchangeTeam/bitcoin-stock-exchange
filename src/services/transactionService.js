import localforage from 'localforage';
import walletService from './walletService';
import { BASE_CURRENCY, TRANSACTIONS_HISTORY_KEY } from '../utils/constants';

export const createTransactionInfo = ({ userId, currencyName, amount, price }) => (
  { userId, currencyName, amount, price }
);

const isUserBuying = (amount) => amount > 0;

const isCurrencySufficient = async ({ userId, currencyName, amount, price }, shouldCheckBaseCurrency) => {
  const availableFunds = await walletService.getAvailableUserFunds(
    userId,
    shouldCheckBaseCurrency ? BASE_CURRENCY : currencyName
  );
  const amountToPay = shouldCheckBaseCurrency ? price * amount : Math.abs(amount);
  return availableFunds >= amountToPay;
};

const isBaseCurrencySufficient = async (transactionInfo) => isCurrencySufficient(transactionInfo, true);

const isCryptocurrencySufficient = async (transactionInfo) => isCurrencySufficient(transactionInfo, false);

export default {
  async registerExchangeQuery(transactionInfo) {
    try {
      const transactionsHistory = await localforage.getItem(TRANSACTIONS_HISTORY_KEY);
      const newTransactionQuery = { time: Date.now(), ...transactionInfo };
      const newTransactionsHistory = [newTransactionQuery, ...transactionsHistory];
      localforage.setItem(TRANSACTIONS_HISTORY_KEY, newTransactionsHistory);
    } catch (err) {
      console.log(err);
    }
  },

  async exchange(transactionInfo) {
    const isSufficient = isUserBuying(transactionInfo.amount)
      ? isBaseCurrencySufficient
      : isCryptocurrencySufficient;

    if (!await isSufficient(transactionInfo)) {
      return false;
    }
    return walletService.exchangeCurrency(transactionInfo);
  }
};
