import axios from 'axios';

export function fetchTransactions(/*user_id*/) { // provide all transactions specific to user
  return dispatch => axios.get('/api/transactions', /*user_id*/)
    .then((response) => {
      dispatch({ type: 'FETCH_TRANSACTIONS_SUCCESSFUL', payload: 'fillmein'/* expecting data*/ });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_TRANSACTIONS_FAILED', payload: err });
    });
}