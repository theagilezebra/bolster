import React from 'react';
import moment from 'moment';

const mapCategories = (transactions) => {
  let total = 0;
  const mapped = {};
  for (const key in transactions) {
    const trans = transactions[key];
    if (trans.category && trans.category[0] !== 'Transfer' && trans.category[0] !== 'Interest') {
      if (!mapped[trans.date]) {
        mapped[trans.date] = Math.round(total += trans.amount);
      } else {
        mapped[trans.date] = Math.round(mapped[trans.date] + trans.amount);
      }
    }
  }
  return mapped;
};

const dateLabels = mappedObj => Object.keys(mappedObj).map(item => moment(item).format('MMMM Do YYYY'));

const populateChart = (data) => {
  const chartData = [];
  const chartConfig = {
    labels: [],
    datasets: [
      {
        label: 'Money Blown',
        lineTension: 0.3,
        data: [],
        borderColor: '#2e8b57',
        backgroundColor: '#9CF3C9',
      },
    ],
  };

  const mapped = mapCategories(data);
  chartConfig.labels = dateLabels(mapped).sort();
  for (const key in mapped) {
    chartData.push(mapped[key]);
  }
  chartConfig.datasets[0].data = chartData.sort();
  return chartConfig;
};


module.exports = {
  mapCategories,
  dateLabels,
  populateChart,
};
