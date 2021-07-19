import { DateTime } from 'luxon';
import database from '../../utils/database';
import { TRANSACTIONS_HISTORY_KEY } from '../../utils/constants';

const registerTransaction = async (transactionInfo, error) => {
  const transactionsHistory = await database.getItem(TRANSACTIONS_HISTORY_KEY) ?? [];
  const newTransactionQuery = { time: DateTime.now().toISO(), transactionInfo, error: error?.message ?? error };
  const newTransactionsHistory = [newTransactionQuery, ...transactionsHistory];
  await database.setItem(TRANSACTIONS_HISTORY_KEY, newTransactionsHistory);
};

export default registerTransaction;
