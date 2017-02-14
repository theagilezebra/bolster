import axios from 'axios';

export function linkAccount(data) {
  return dispatch => axios.post('/api/accounts/create', data)
    .then((response) => {
      dispatch({ type: 'LINK_ACCOUNT_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'LINK_ACCOUNT_FAILED', payload: err.response });
    });
}

export function fetchAccounts() {
  return dispatch => axios.get('/api/accounts')
    .then((response) => {
      dispatch({ type: 'FETCH_ACCOUNTS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ACCOUNTS_FAILED', payload: err.response });
    });
}
