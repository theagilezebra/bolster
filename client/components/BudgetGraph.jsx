import React from 'react';
import { Line } from 'react-chartjs';
import Goals from './Goals.jsx';
// import { fetchTransactions } from '../actions/transActions';

class BudgetGraph extends React.Component {

  componentDidMount() {
    // this.props.dispatch(fetchTransactions()).then(() => {
    //   console.log('helo');
    // });
  }

  render() {
    return (
      <div>
        <Goals dispatch={this.props.dispatch} />
        <Line data={this.props.data} height="450" width="900" />
      </div>
    );
  }
}

export default BudgetGraph;
