import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';

// actions and other components
// import css from '../styles/main.css';
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
            <BudgetGraph data={this.props.transactions} />
        )}
        />
        <Route
          path="/transactions" component={() => (
            <Transactions data={this.props.transactions} />
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
}))(App);
