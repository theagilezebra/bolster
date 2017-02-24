import axios from 'axios';
import { getUserId } from '../helpers/stateHelpers';

export function fetchAchievements() {
  const headers = { Authorization: `Bearer ${window.localStorage.userToken}` };
  return (dispatch, getState) => axios.get(`/api/achievements?user_id=${getUserId(getState)}`, { headers })
    .then((response) => {
      debugger;
      dispatch({ type: 'FETCH_ACHIEVEMENTS_SUCCESSFUL', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_ACHIEVEMENTS_FAILED', payload: err });
    });
}
