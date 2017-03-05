import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import requireAuth from '../helpers/authHelpers';
import Profile from './Profile.jsx';
import Landing from './Landing.jsx';
import Dashboard from './Dashboard.jsx';
import BudgetGraph from './BudgetGraph.jsx';
import Transactions from './Transactions.jsx';
import Achievements from './Achievements.jsx';

import { fetchAccounts } from '../actions/accountActions';
import { fetchTransactions } from '../actions/transActions';
import { fetchGoals } from '../actions/goalActions';
import { fetchBudgets } from '../actions/budgetActions';
import { fetchCategories } from '../actions/categoryActions';
import { fetchAchievements } from '../actions/achievementActions';
import { checkAuth } from '../actions/userActions';

class App extends React.Component {

  componentDidMount() {
    const dispatch = this.props.dispatch;

    dispatch(checkAuth())
    .then((response) => {
      if (response.response.status === 401) return;
      dispatch(fetchAccounts());
      dispatch(fetchTransactions());
      dispatch(fetchGoals());
      dispatch(fetchBudgets());
      dispatch(fetchCategories());
      dispatch(fetchAchievements());
    })
    .catch((err) => {
      console.error(`error fetching data: ${err}`);
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
          component={() => (<Dashboard />)}
          onEnter={requireAuth}
        />
        <Route
          path="/achievements"
          component={() => (<Achievements />)}
          onEnter={requireAuth}
        />
        <Route
          path="/profile"
          component={() => (<Profile />)}
          onEnter={requireAuth}
        />
      </Router>
    );
  }
}

export default connect(null)(App);
