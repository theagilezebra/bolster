import axios from 'axios';
import { getUserId } from '../helpers/stateHelpers';

export function requestTransactions() {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => axios.post('/api/plaid', { id: getUserId(getState) }, { headers })
    .then((response) => {
      dispatch({ type: 'REQUEST_TRANSACTIONS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'REQUEST_TRANSACTIONS_FAILED', payload: err.response });
    });
}

export function fetchTransactions() {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => axios.get(`/api/transactions?user_id=${getUserId(getState)}`, { headers })
    .then((response) => {
      dispatch({ type: 'FETCH_TRANSACTIONS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_TRANSACTIONS_FAILED', payload: err.response });
    });
}
