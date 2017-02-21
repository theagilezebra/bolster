import React from 'react';
import { sortByDate, dateLabels } from './chartHelpers.jsx';

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


const mapCategories = (transactions) => {
  transactions.sort(sortByDate);
  let total = 0;
  const mapped = {};
  for (const key in transactions) {
    const trans = transactions[key];
    if (trans.categories[0] !== 'Transfer' && trans.categories[0] !== 'Interest') {
      if (!mapped[trans.date]) {
        mapped[trans.date] = Math.round(total += trans.amount);
      } else {
        mapped[trans.date] = Math.round(mapped[trans.date] + trans.amount);
      }
    }
  }
  return mapped;
};


const populateChart = (data) => {
  const chartData = [];
  const mapped = mapCategories(data);
  chartConfig.labels = dateLabels(mapped);
  for (const key in mapped) {
    chartData.push(mapped[key]);
  }
  chartConfig.datasets[0].data = chartData;
  return chartConfig;
};


module.exports = {
  mapCategories,
  dateLabels,
  populateChart,
};
