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
        dispatch({ type: 'LINK_ACCOUNTS_FAILED', payload: err.response });
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

