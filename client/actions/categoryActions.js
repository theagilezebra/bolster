import axios from 'axios';

export function fetchCategories() {
  return dispatch => axios.get('/api/categories')
    .then((response) => {
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_CATEGORIES_FAILED', payload: err.response });
    });
}
