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
      // const lastCat = item.categories.length - 1;
      if (mapped[item.categories[1]] === undefined) {
        mapped[item.categories[1]] = item.amount;
      } else {
        mapped[item.categories[1]] = Math.round(mapped[item.categories[1]] + item.amount);
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
      // const lastCat = item.categories.length - 1;
      if (!labels.includes(item.categories[0])) {
        labels.push(item.categories[0]);
      }
    }
  });
  return labels;
};

const renderCategoryDropdown = (categories, transactionCategories, tier, width, transactionId, callback) => (
  <select onChange={callback} data-id={transactionId} data-tier={tier} style={width}>
    <option>{transactionCategories[tier] || 'Uncategorized'}</option>
    {
      categories.map((category, key) => <option key={key}>{category}</option>)
    }
  </select>
)

const renderTransactions = (transactions, categoryList, callback) => {
  return transactions.map(({ name, amount, date, categories, id }, key) => (
    <tr key={key}>
      <td>{name}</td>
      <td>{amount}</td>
      <td>{date}</td>
      <td>{renderCategoryDropdown(Object.keys(categoryList), categories, 0, {}, id, callback)}</td>
      <td>{renderCategoryDropdown(categoryList[categories[0]], categories, 1, {width: "303px"}, id, callback)}</td>
    </tr>
  ));
}

const populateChart = (data) => {
  const chartData = [];
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
  return transactions.filter(transaction => !!transaction && transaction.amount > 0)
  .map((transaction) => {
    if (transaction.categories.length < 2) {
      transaction.categories[1] = 'Uncategorized'
    }
    transaction.amount = +transaction.amount;
    transaction.date = transaction.date.slice(0, 10);
    return transaction;
  });
}

const overwriteTransactionCategories = (transactions, { id, categories }) => {
  return transactions.map((transaction) => {
    if (transaction.id === (+id)) {
      transaction.categories = categories;
    }
    return transaction;
  });
}

module.exports = {
  budget,
  mapAndRender,
  populateChart,
  convertTransactions,
  renderTransactions,
  overwriteTransactionCategories,
};
