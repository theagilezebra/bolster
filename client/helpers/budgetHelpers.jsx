import React from 'react';
import moment from 'moment';
import { sortByDate, dateLabels } from './chartHelpers.jsx';

const chartConfig = {
  labels: [],
  datasets: [
    {
      label: 'Money Blown',
      lineTension: 0.3,
      data: [],
      borderColor: '#37f3a8',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  ],
  limbo: [
    {
      label: 'Average Spending',
      lineTension: 0,
      data: [],
      borderColor: '#ff0000',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      radius: 0,
      hitRadius: 10,
      hoverRadius: 10,
    },
    {
      label: 'Spending Limit',
      lineTension: 0,
      data: [],
      borderColor: '#ffff00',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      radius: 0,
      hitRadius: 10,
      hoverRadius: 10,
    },
  ],
};

const mapCategories = (transactions) => {
  transactions.sort(sortByDate);
  const total = 0;
  const mapped = {};
  for (const key in transactions) {
    const trans = transactions[key];
    if (!mapped[trans.date]) {
      mapped[trans.date] = Math.round(total + trans.amount);
    } else {
      mapped[trans.date] = Math.round(mapped[trans.date] + trans.amount);
    }
  }
  return mapped;
};

const populateChart = ({ transactionsData }) => {
  const chartData = [];
  const mapped = mapCategories(transactionsData);
  chartConfig.labels = dateLabels(mapped);
  for (const key in mapped) {
    chartData.push(mapped[key]);
  }
  chartConfig.datasets[0].data = chartData;
  return chartConfig;
};

const populateGoalChart = ({ transactionsData, dailyAverage }, { amount, startDate, endDate }) => {
  let { labels, datasets, limbo } = chartConfig;
  let total = 0;
  const chartData = [];
  const goalData = [];
  const averageData = [];
  const goalTimespan = [];
  const days = Math.floor((moment(endDate).valueOf() - moment(startDate).valueOf()) / 86400000);
  const mapped = mapCategories(transactionsData);
  if (!datasets[1]) {
    datasets.unshift(limbo[0], limbo[1]);
  }
  for (const key in mapped) {
    const nextDay = moment(key).add(1, 'd').format('YYYY-MM-DD');
    if (!mapped[nextDay]) mapped[nextDay] = 0;
  }
  for (const key in mapped) {
    if (moment(key).valueOf() < moment(startDate).valueOf()) delete mapped[key];
  }
  Object.keys(mapped)
    .map(key => [key, mapped[key]])
    .sort((a, b) => moment(a[0]).valueOf() > moment(b[0]).valueOf())
    .forEach((tuple) => { chartData.push(tuple[1]); });
  for (let i = 0; i < days; i += 1) {
    goalTimespan.push(moment(startDate).add(i, 'd').format('MMMM Do YYYY'));
    averageData.push(dailyAverage * days);
    goalData.push((dailyAverage * days) - amount);
  }
  labels = goalTimespan;
  datasets[0].data = averageData;
  datasets[1].data = goalData;
  datasets[2].data = chartData.map(num => total += num).slice(0, -1);
  return { labels, datasets };
};

module.exports = {
  mapCategories,
  dateLabels,
  populateChart,
  populateGoalChart,
};
