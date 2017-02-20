import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

import { fetchAccounts } from '../actions/accountActions';
import fetchTransactions from '../actions/transActions';
import { fetchGoals } from '../actions/goalActions';
import { fetchBudgets } from '../actions/budgetActions';
import { checkAuth } from '../actions/userActions';
import requireAuth from '../helpers/authHelpers';
// actions and other components
import Landing from './Landing.jsx';
import Dashboard from './Dashboard.jsx';
import BudgetGraph from './BudgetGraph.jsx';
import Transactions from './Transactions.jsx';

class App extends React.Component {

  componentDidMount() {
    const dispatch = this.props.dispatch;

    dispatch(checkAuth())
    .then(() => dispatch(fetchAccounts()))
    .then(() => dispatch(fetchTransactions()))
    .then(() => dispatch(fetchGoals()))
    .then(() => dispatch(fetchBudgets()))
    .catch(() => {
      console.err('uninformative error: fetching data');
    });
  }

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route
          path="/budgetchart"
          component={() => (<BudgetGraph />)}
          onEnter={requireAuth}
        />
        <Route
          path="/transactions"
          component={() => (<Transactions />)}
          onEnter={requireAuth}
        />
        <Route
          path="/dashboard"
          component={() => (<Dashboard dispatch={this.props.dispatch} />)}
          onEnter={requireAuth}
        />
      </Router>
    );
  }
}

export default connect(state => ({
  transactions: state.transactions,
  userId: state.user.userId,
  goalData: state.goalData,
}))(App);
