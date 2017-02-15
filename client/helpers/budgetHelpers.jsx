import React from 'react';

const mapCategories = function (data) {
  let total = 0;
  const mapped = {};
  data.transactions.forEach((item) => {
    if (item.category && item.category[0] != 'Transfer' && item.category[0] != 'Interest') {
      if (mapped[item.date] === undefined) {
        mapped[item.date] = Math.round(total += item.amount);
      } else {
        mapped[item.date] = Math.round(mapped[item.date] + item.amount);
      }
    }
  });
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
