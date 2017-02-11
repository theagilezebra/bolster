import axios from 'axios';

export function linkAccount({ token }) {
  return dispatch => axios.post('/api/accounts', { token })
    .then((response) => {
      dispatch({ type: 'LINK_ACCOUNT_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'LINK_ACCOUNT_FAILED', payload: err.response });
    });
}
