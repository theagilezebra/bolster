import React from 'react';

const budget = {
  Transfer: 200,
  Shops: 45,
  'Food and Drink': 450,
  Interest: 30,
};

const renderRows = function (mappedObj) {
  const elements = [];
  for (const key in mappedObj) {
    elements.push(
      <tr>
        <td>{key}</td>
        <td>{mappedObj[key]}</td>
        <td>{budget[key]}</td>
        <td>{budget[key] - mappedObj[key]}</td>
      </tr>,
    );
  }
  return elements;
};

// this function does not add transactions that lack a category. it ignores.
const mapCategories = function (data) {
  const mapped = {};
  data.transactions.forEach((item) => {
    if (item.category && item.category[0] != 'Transfer' && item.category[0] != 'Interest') {
      if (mapped[item.category[0]] === undefined) {
        mapped[item.category[0]] = 0;
      } else {
        mapped[item.category[0]] = Math.round(mapped[item.category[0]] + item.amount);
      }
    }
  });
  return mapped;
};

const mapAndRender = function (data) {
  return renderRows(mapCategories(data));
};

const labelize = function (data) {
  const labels = [];
  data.transactions.forEach((item) => {
    if (item.category && item.category[0] != 'Transfer' && item.category[0] != 'Interest') {
      if (labels.includes(item.category[0]) === false) {
        labels.push(item.category[0]);
      }
    }
  });
  return labels;
};

const populateChart = function (data) {
  const chartData = [];
  const chartConfig = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#2E8B57',
          '#9CF3C9',
        ],
      },
    ],
  };
  chartConfig.labels = labelize(data);
  const mapped = mapCategories(data);
  for (const key in mapped) {
    chartData.push(mapped[key]);
  }
  chartConfig.datasets[0].data = chartData;
  return chartConfig;
};

module.exports = {
  budget,
  mapAndRender,
  populateChart,
};
