import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

// actions and other components
import Landing from './Landing.jsx';
import Dashboard from './Dashboard.jsx';
import BudgetGraph from './BudgetGraph.jsx';
import Transactions from './Transactions.jsx';

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route
          path="/budgetchart" component={() => (
            <BudgetGraph />
        )}
        />
        <Route
          path="/transactions" component={() => (
            <Transactions />
        )}
        />
        <Route
          path="/dashboard" component={() => (
            <Dashboard dispatch={this.props.dispatch} />
        )}
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
