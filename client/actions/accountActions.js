import axios from 'axios';

export function linkAccount(token, institutionName) {
  return dispatch => axios.post('/api/accounts/create', { token, institutionName })
    .then((response) => {
      dispatch({ type: 'LINK_ACCOUNT_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'LINK_ACCOUNT_FAILED', payload: err.response });
    });
}
