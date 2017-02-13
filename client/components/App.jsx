import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
// actions and other components
// import css from '../styles/main.css';
import Landing from './Landing.jsx';
import Dashboard from './Dashboard.jsx';
import BudgetChart from './BudgetGraph.jsx';
import TransactionChart from './TransactionChart.jsx';

class App extends React.Component {

  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Landing} />
        <Route
          path="/budgetchart" component={() => (
            <BudgetChart data={this.props.chartdata} />
        )}
        />
        <Route
          path="/transactions" component={() => (
            <TransactionChart data={this.props.chartdata} />
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

    chartdata: state.chartdata

}))(App);
