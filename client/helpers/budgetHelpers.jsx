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
      borderColor: '#2e8b57',
      backgroundColor: '#9CF3C9',
    },
  ],
  limbo: [
    {
      label: 'Spending Limit',
      lineTension: 0,
      data: [],
      borderColor: '#222222',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      radius: 0,
      hitRadius: 10,
      hoverRadius: 10,
    },
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

const populateGoalChart = ({ transactionsData, dailyAverage }, goal) => {
  let { labels, datasets, limbo } = chartConfig;
  const chartData = [];
  const goalData = [];
  const averageData = [];
  const goalTimespan = [];
  const days = Math.floor((moment(goal.endDate).valueOf() - moment(goal.startDate).valueOf()) / 86400000);
  const mapped = mapCategories(transactionsData);
  if (!datasets[1]) {
    datasets = datasets.concat(limbo);
  }
  for (const key in mapped) {
    moment(key).valueOf() < moment(goal.startDate).valueOf() ? delete mapped[key] : chartData.push(mapped[key]);
  }
  if (!Object.keys(mapped).length) {
    chartData.push(0);
  }
  for (let i = 0; i < days; i += 1) {
    goalTimespan.push(moment(goal.startDate).add(i, 'd').format('MMMM Do YYYY'));
    averageData.push(dailyAverage * days);
    goalData.push((dailyAverage * days) - goal.amount);
  }
  labels = goalTimespan;
  datasets[0].data = chartData;
  datasets[1].data = goalData;
  datasets[2].data = averageData;
  return { labels, datasets, limbo };
};


module.exports = {
  mapCategories,
  dateLabels,
  populateChart,
  populateGoalChart,
};
