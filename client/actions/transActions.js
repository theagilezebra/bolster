import axios from 'axios';

export function fetchTransactions(userId) {
  return dispatch => axios.get(`/api/transactions?id=${userId}`)
    .then((response) => {
      dispatch({ type: 'FETCH_TRANSACTIONS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_TRANSACTIONS_FAILED', payload: err });
    });
}
