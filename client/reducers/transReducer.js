import { convertTransactions, overwriteTransactionCategories, getDailySpendingAverage } from '../helpers/transactionHelpers.jsx';

export default function (state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'REQUEST_TRANSACTIONS_SUCCESSFUL': {
    console.log('Request transactions successful.');
    break;
  }
  case 'REQUEST_TRANSACTIONS_FAILED': {
    console.log('Request transactions failed.');
    break;
  }
  case 'FETCH_TRANSACTIONS_SUCCESSFUL': {
    newState.transactionsData = convertTransactions(action.payload);
    newState.dailyAverage = getDailySpendingAverage(action.payload);
    break;
  }
  case 'FETCH_TRANSACTIONS_FAILED': {
    console.log('Fetch transactions failed.');
    break;
  }
  case 'UPDATE_TRANSACTION_SUCCESSFUL': {
    newState.transactionsData = overwriteTransactionCategories(newState.transactionsData, action.payload);
    break;
  }
  case 'UPDATE_TRANSACTION_FAILED': {
    console.log('Update transaction failed.');
    break;
  }
  }
  return newState;
}
