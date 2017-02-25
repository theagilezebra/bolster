import { convertTransactions, overwriteTransactionCategories } from '../helpers/transactionHelpers.jsx';

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
    break;
  }
  case 'FETCH_TRANSACTIONS_FAILED': {
    console.log('Fetch transactions failed.');
    break;
  }
  case 'UPDATE_TRANSACTION_SUCCESSFUL': {
    console.log('Update transaction successful.');
    break;
  }
  case 'UPDATE_TRANSACTION_FAILED': {
    console.log('Update transaction failed.');
    break;
  }
  case 'RERENDER_TRANSACTIONS_SUCCESSFUL': {
    newState.transactionsData = overwriteTransactionCategories(newState.transactionsData, action.payload);
    break;
  }
  }
  return newState;
}
