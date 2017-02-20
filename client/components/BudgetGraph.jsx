import React from 'react';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Goals from './Goals.jsx';
import NavigationBar from './NavBar.jsx';
import { populateChart } from '../helpers/budgetHelpers.jsx';

const BudgetGraph = props => (
  <div>
    <NavigationBar landing={false} />
    <h3 className="quicksand centertext">Your Current Spending</h3>
    <Line data={populateChart(props.data)} height={350} width={800} />
    <div >
      <Goals />
    </div>
  </div>
);

export default connect(state => ({
  data: state.transactions.transactionsData,
}))(BudgetGraph);
