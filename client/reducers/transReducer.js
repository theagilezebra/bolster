export default function (state, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case 'FETCH_TRANSACTIONS_SUCCESSFUL': {
    newState.transactionsData = action.payload.map((transaction) => {
      transaction.amount = +transaction.amount;
      transaction.date = transaction.date.slice(0, 10);
      return transaction;
    });
    break;
  }
  case 'FETCH_TRANSACTIONS_FAILED': {
    console.log('FETCH_TRANSACTIONS_FAILED');
    break;
  }
  }
  return newState;
}
