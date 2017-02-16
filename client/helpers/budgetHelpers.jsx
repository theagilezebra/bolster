import React from 'react';

const mapCategories = function (transactions) {
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

const dateLabels = function (mappedObj) {
  return Object.keys(mappedObj);
};

const populateChart = function (data) {
  const chartData = [];
  const chartConfig = {
    labels: [],
    datasets: [
      {
        label: 'Spending',
        lineTension: 0.1,
        data: [],
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
