import React from 'react';
import Chart from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { populateChart } from '../helpers/transactionHelpers.jsx';

const TransactionChart = props => (
  <div className="transright">
    <Doughnut data={populateChart(props.data)} options={props.option} height={450} width={900} />
  </div>
);

export default connect(state => ({
  data: state.transactions,
}))(TransactionChart);

