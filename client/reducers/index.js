import { combineReducers } from 'redux';
import user from './userReducer';
import accounts from './accountReducer';
import transactions from './transReducer';
import businesses from './businessReducer';
import budgets from './budgetReducer';
import goals from './goalReducer';
import categories from './categoryReducer';
import render from './renderReducer';
import achievements from './achievementReducer';
import error from './errorReducer';
import { defaultState } from '../helpers/stateHelpers';

const appReducer = combineReducers({
  user,
  accounts,
  achievements,
  transactions,
  businesses,
  budgets,
  goals,
  categories,
  render,
  error,
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGNOUT') {
    state = defaultState;
  }
  return appReducer(state, action);
};

export default rootReducer;

