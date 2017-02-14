import { combineReducers } from 'redux';
import users from './userReducer';
import goals from './goalReducer';
import transactions from './transReducer';
import accounts from './accountReducer';
import budgets from './budgetReducer';

export default combineReducers({
  users,
  goals,
  transactions,
  accounts,
  budgets,
});
