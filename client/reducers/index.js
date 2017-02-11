import { combineReducers } from 'redux';
import users from './userReducer.js';
import goals from './goalReducer.js';
import transactions from './transReducer.js';

export default combineReducers({
    users,
    goals,
    transactions
});
