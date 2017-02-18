import axios from 'axios';

export function linkAccounts(data) {
  return dispatch => axios.post('/api/plaid/link', data)
    .then((response) => {
      dispatch({ type: 'LINK_ACCOUNTS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'LINK_ACCOUNTS_FAILED', payload: err.response });
    });
}

export function fetchAccounts(userId) {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return dispatch => axios.get(`/api/accounts?user_id=${userId}`, { headers })
    .then((response) => {
      dispatch({ type: 'FETCH_ACCOUNTS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ACCOUNTS_FAILED', payload: err.response });
    });
}

