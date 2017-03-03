import React from 'react';
import moment from 'moment';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Goals from './Goals.jsx';
import NavigationBar from './NavBar.jsx';
import { renderGoal } from '../actions/goalActions';
import { requestTransactions, fetchTransactions } from '../actions/transActions';
import { populateChart, populateGoalChart } from '../helpers/budgetHelpers.jsx';

class BudgetGraph extends React.Component {

  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(requestTransactions()).then(() => dispatch(fetchTransactions()));
  }

  limitGoalDate({ target }) {
    const { name, amount, startDate, endDate, originalEndDate } = this.props.goal.currentGoal;
    const goalStartDate = moment(startDate).valueOf();
    const initialEndDate = moment(endDate).valueOf();
    const initialGoalTimespan = (initialEndDate - goalStartDate) / 86400000;
    const newEndDate = moment(target.value).valueOf();
    const newGoalTimespan = (newEndDate - goalStartDate) / 86400000;

    this.props.dispatch(renderGoal({
      name,
      amount: Math.round(amount / (initialGoalTimespan / newGoalTimespan)),
      startDate,
      endDate: target.value,
      originalEndDate,
    }));
  }

  render() {
    return (
      <div>
        <NavigationBar landing={false} />
        <h3 className="quicksand centertext">Your Current Spending</h3>
        {
          !this.props.goal.currentGoal
            ? <Line data={populateChart(this.props.transactions)} height={350} width={800} />
            : <div>
              <input
                type="date"
                onChange={this.limitGoalDate.bind(this)}
                className="limit-inputsize inputmargin"
                min={moment(this.props.goal.currentGoal.startDate).add(3, 'd').format('YYYY-MM-DD')}
                max={this.props.goal.currentGoal.originalEndDate}
              />
              <Line
                data={populateGoalChart(this.props.transactions, this.props.goal.currentGoal)}
                options={{ scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }}
                height={350}
                width={800}
              />
            </div>
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
