import axios from 'axios';
import { getUserId } from '../helpers/stateHelpers';

export function linkAccounts(data) {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => {
    data.id = getUserId(getState);
    return axios.post('/api/plaid/link', data, { headers })
    .then((response) => {
      dispatch({ type: 'LINK_ACCOUNTS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'LINK_ACCOUNTS_FAILED', payload: 'This bank account is already added.' });
    });
  };
}

export function fetchAccounts() {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => axios.get(`/api/accounts?user_id=${getUserId(getState)}`, { headers })
    .then((response) => {
      dispatch({ type: 'FETCH_ACCOUNTS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ACCOUNTS_FAILED', payload: err.response });
    });
}

export function deleteAccount(data) {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => {
    data.user_id = getUserId(getState);
    const config = { headers, data };
    return axios.delete('/api/accounts', config)
    .then((response) => {
      dispatch({ type: 'DELETE_INSTITUTION_SUCCESSFUL', payload: data.accountName });
    })
    .catch(() => {
      const errorMessage = 'There was an issue deleting your institution, please try again or contact support.';
      dispatch({ type: 'DELETE_INSTITUTION_FAILED', payload: errorMessage });
    });
  };
}

