import React from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Goals from './Goals.jsx';
import NavigationBar from './NavBar.jsx';
import { requestTransactions, fetchTransactions } from '../actions/transActions';
import { populateChart, populateGoalChart } from '../helpers/budgetHelpers.jsx';

class BudgetGraph extends React.Component {

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(requestTransactions()).then(() => dispatch(fetchTransactions()));
  }

  render() {
    return (
      <div>
        <NavigationBar landing={false} />
        <h3 className="quicksand centertext">Your Current Spending</h3>
        {
          !this.props.goal.currentGoal
            ? <Line data={populateChart(this.props.transactions)} height={350} width={800} />
            : <Line data={populateGoalChart(this.props.transactions, this.props.goal.currentGoal)} height={350} width={800} />
        }
        <div >
          <Goals />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  transactions: state.transactions,
  goal: state.goals,
}))(BudgetGraph);
