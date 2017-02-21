import React from 'react';

const budget = {
  Transfer: 200,
  Shops: 45,
  'Food and Drink': 450,
  Interest: 30,
};

const chartConfig = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: '#9CF3C9',
    },
  ],
};

const renderRows = (mappedObj) => {
  const elements = [];
  for (const key in mappedObj) {
    elements.push(
      <tr key={key}>
        <td>{key}</td>
        <td>{mappedObj[key]}</td>
        <td>{budget[key] ? budget[key] : 'No budget specified'}</td>
        <td>{budget[key] ? budget[key] - mappedObj[key] : 'No budget specified'}</td>
      </tr>,
    );
  }
  return elements;
};

// this function does not add transactions that have an empty category property. it ignores them.
const mapCategories = (transactions) => {
  const mapped = {};
  transactions.forEach((item) => {
    if (item.categories[0] !== 'Transfer' && item.categories[0] !== 'Interest') {
      const lastCat = item.categories.length - 1;
      if (mapped[item.categories[lastCat]] === undefined) {
        mapped[item.categories[lastCat]] = item.amount;
      } else {
        mapped[item.categories[lastCat]] = Math.round(mapped[item.categories[lastCat]] + item.amount);
      }
    }
  });
  return mapped;
};

const mapAndRender = data => renderRows(mapCategories(data));

const labelize = (transactions) => {
  const labels = [];
  transactions.forEach((item) => {
    if (item.categories[0] !== 'Transfer' && item.categories[0] !== 'Interest') {
      const lastCat = item.categories.length - 1;
      if (labels.includes(item.categories[lastCat]) === false) {
        labels.push(item.categories[lastCat]);
      }
    }
  });
  return labels;
};

const populateChart = (data) => {
  const chartData = [];
  console.log(chartConfig);
  chartConfig.datasets[0].backgroundColor = ['#00DFAE', '#00B9B9', '#00CDB4', '#00A0C3', '#01EFAD', '#263650', '#E74E4E', '#57CBFF', '#2273AA'];
  chartConfig.labels = labelize(data);
  const mapped = mapCategories(data);
  for (const key in mapped) {
    chartData.push(mapped[key]);
  }
  chartConfig.datasets[0].data = chartData;
  return chartConfig;
};

const convertTransactions = (transactions) => {
  return transactions.filter(transaction => !!transaction)
  .map((transaction) => {
    transaction.amount = +transaction.amount;
    transaction.date = transaction.date.slice(0, 10);
    return transaction;
  });
}

module.exports = {
  budget,
  mapAndRender,
  populateChart,
  convertTransactions,
};
