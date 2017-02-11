import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
// actions and other components
// import css from '../styles/main.css';
import JumbotronOne from './JumbotronOne.jsx';
import JumbotronTwo from './JumbotronTwo.jsx';
import SignIn from './Signin.jsx';
import TransactionChart from './TransactionChart.jsx';
import BudgetGraph from './BudgetGraph.jsx';

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={SignIn} />
        <Route
          path="/budgetchart" component={() => (
            <JumbotronOne data={this.props.radardata} />
        )}
        />
        <Route
          path="/transactions" component={() => (
            <JumbotronTwo data={this.props.radardata} />
        )}
        />
      </Router>
    );
  }
}

export default connect(state => ({
  radardata: state.radardata,
}))(App);
