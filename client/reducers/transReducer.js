import { convertTransactions } from '../helpers/transactionHelpers.jsx'; 

export default function (state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'REQUEST_TRANSACTIONS_SUCCESSFUL': {
    newState.transactionsData = action.payload;
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
    console.log('FETCH_TRANSACTIONS_FAILED');
    break;
  }
  }
  return newState;
}
