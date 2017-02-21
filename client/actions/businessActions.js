import axios from 'axios';

export default function fetchBusinesses() {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return dispatch => axios.get('/api/businesses', { headers })
    .then((response) => {
      dispatch({ type: 'FETCH_BUSINESSES_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_BUSINESSES_FAILED', payload: err.response });
    });
}
