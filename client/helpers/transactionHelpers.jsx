import React from 'react';
import moment from 'moment';

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

const mapCategories = (transactions) => {
  const mapped = {};
  transactions.forEach((item) => {
    if (item.categories[0] !== 'Transfer' && item.categories[0] !== 'Interest') {
      if (mapped[item.categories[0]] === undefined) {
        mapped[item.categories[0]] = item.amount;
      } else {
        mapped[item.categories[0]] = Math.round(mapped[item.categories[0]] += item.amount);
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
      if (!labels.includes(item.categories[0])) {
        labels.push(item.categories[0]);
      }
    }
  });
  return labels;
};

const renderCategoryDropdown = (categories, transactionCategories, tier, width, transactionId, callback) => (
  <select value={transactionCategories[tier]} onChange={callback} data-id={transactionId} data-tier={tier} style={width}>
    {
      categories.map((category, key) => <option key={key}>{category}</option>)
    }
  </select>
);

const renderTransactions = (transactions, categoryList, callback) => transactions
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  .map(({ name, amount, date, categories, id }, key) => (
    <tr key={key}>
      <td>{name}</td>
      <td>{amount}</td>
      <td>{moment(date).format('MMMM Do YYYY')}</td>
      <td>{renderCategoryDropdown(Object.keys(categoryList), categories, 0, {}, id, callback)}</td>
      <td>{renderCategoryDropdown(categoryList[categories[0]], categories, 1, { width: '303px' }, id, callback)}</td>
    </tr>
  ));

const populateChart = (data) => {
  const chartData = [];
  chartConfig.datasets[0].backgroundColor = ['#00DFAE', '#FC4C4D', '#FCDA02', '#00B9B9', '#023E73', '#00CDB4', '#FC4C4D', '#00A0C3', '#01EFAD', '#263650', '#E74E4E', '#57CBFF', '#2273AA'];
  chartConfig.labels = labelize(data);
  const mapped = mapCategories(data);
  for (const key in mapped) {
    chartData.push(mapped[key]);
  }
  chartConfig.datasets[0].data = chartData;
  return chartConfig;
};

const convertTransactions = transactions => transactions
  .filter(transaction => !!transaction && transaction.amount)
  .map((transaction) => {
    if (transaction.categories.length < 2) {
      transaction.categories[1] = 'Uncategorized';
    }
    transaction.amount = +transaction.amount;
    transaction.date = transaction.date.slice(0, 10);
    return transaction;
  });

const overwriteTransactionCategories = (prev, updated) => {
  const updatedTransactions = convertTransactions(updated);
  return prev.map((transaction) => {
    let temp = transaction;
    for (let i = 0; i < updatedTransactions.length; i++) {
      if (updatedTransactions[i].id === transaction.id) {
        temp = updatedTransactions[i];
      }
    }
    return temp;
  });
};

const getDailySpendingAverage = (transactions) => {
  const sorted = transactions.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  if (sorted.length) {
    const days = Math.floor((moment(sorted[0].date).valueOf() - moment(sorted[sorted.length - 1].date).valueOf()) / 86400000);
    return Math.floor(Math.floor(transactions.reduce((total, transaction) => total += transaction.amount, 0)) / days);
  }
};

module.exports = {
  budget,
  mapAndRender,
  populateChart,
  convertTransactions,
  renderTransactions,
  getDailySpendingAverage,
  overwriteTransactionCategories,
  mapCategories,
  labelize,
};
