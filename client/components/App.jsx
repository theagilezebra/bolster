import React from 'react';
import { connect } from 'react-redux';
// actions and other components
//import css from '../styles/main.css';
import TransactionChart from './TransactionChart.jsx';
import BudgetGraph from './BudgetGraph.jsx'
class App extends React.Component {

  render() {
    return (
      <div>
        <div>This is our website!!</div>
        <TransactionChart data={this.props.radardata} />
        <BudgetGraph data= {this.props.linedata} />
      </div>
    );
  }
}

export default connect(state => ({
    radardata: state.radardata,
    linedata: state.linedata
}))(App);
