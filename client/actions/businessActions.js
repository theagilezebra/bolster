import axios from 'axios';

export function fetchBusinesses() {
  return dispatch => axios.get('/api/businesses')
    .then((response) => {
      dispatch({ type: 'FETCH_BUSINESSES_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_BUSINESSES_FAILED', payload: err.response });
    });
}
