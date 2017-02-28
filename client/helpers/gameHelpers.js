// import moment from 'moment';
const moment = require('moment');

const getTotal = purchases => purchases.reduce((prev, curr) => prev += curr.amount, 0);

const getAverage = (days, transactions) => {
  const total = getTotal(transactions);
  return Math.round(total / days);
};

const categoryHighRange = (category) => {
  if (category === 'undefined' || category.length !== 8 || typeof category !== 'string') {
    throw new Error('please provide valid category');
  }
  let nines = '';
  for (let i = category.length - 1; i >= 0; i -= 1) {
    if (category[i] !== '0') {
      return category.slice(0, i + 1) + nines;
    }
    nines += '9';
  }
  return category;
};

const filterTransactions = (transactions, category) => {
  if (category === 'undefined' || category.length !== 8 || typeof category !== 'string') {
    throw new Error('please provide valid category');
  }
  const highRange = categoryHighRange(category);
  return transactions.filter((transaction) => {
    const filter = category !== highRange && +transaction.attributes.category >= +category && +transaction.attributes.category <= +category;
    return filter ? transaction : transaction.attributes.category === category;
  }).length;
};

const timeFrame = (start, days) => {
  const results = [];
  results.push(moment(start).format('MM/DD/YYYY'));
  if (!days) {
    return results;
  }
  let previous = results[0];
  let curr = 1;
  while (curr < days) {
    const date = moment(previous).add(1, 'day').format('MM/DD/YYYY');
    results.push(date);
    previous = moment(date);
    curr += 1;
  }
  return results;
};
// this is a rolling average
const previousMonth = (start, period, transactions) => {
  const startDate = moment(start).subtract(1, 'month');
  const purchases = filterPurchases(startDate, 30, transactions);
  const prevMonthTotal = Math.round(getTotal(purchases));
  if (period === 'daily') {
    const prevMonthDailyAverage = getAverage(30, purchases);
    return prevMonthDailyAverage;
  }
  const prevMonthWeeklyAverage = getAverage(4, purchases);
  return prevMonthWeeklyAverage;
};


const filterPurchases = (start, days, transactions) => {
  const time = timeFrame(start, days);
  return transactions.filter(purchase => time.includes(moment(purchase.date).format('MM/DD/YYYY')));
};

const progressBar = (start, days, period, transactions) => {
  const comparison = previousMonth(start, period, transactions);
  // gets purchases from start date until date x number of days away
  const purchases = filterPurchases(start, days, transactions);
  // totals periods from that time period
  const total = getTotal(purchases);
  // averages periods from that time period
  const average = getAverage(purchases.length, purchases);
  console.log('average from previous month', comparison);
  console.log('average from that period', average);
  console.log('purchases from that period', purchases);
  console.log('total from that period', total);
  console.log('progress bar percentage', Math.round((average / comparison) * 100));
  return Math.round((average / comparison) * 100);
};
// /////ACHIEVEMENT FUNCTIONS///////////////////
const trappistMonk = (start, days, transactions) => getTotal(filterPurchases(start, days, transactions));

const hero = (start, days, period, transactions) => {
  const total = getTotal(filterPurchases(start, days, transactions));
  // this produces either a daily or weekly average from the last month based on which period is passed as an argument
  const prevMonthAverage = previousMonth(start, period, transactions);
  const percentage = progressBar(start, days, period, transactions);
  return {
    total,
    prevMonthAverage,
    percentage,
  };
};
// /////////////////////////////////////////////
module.exports = {
  getAverage,
  timeFrame,
  filterPurchases,
  progressBar,
  previousMonth,
  trappistMonk,
  hero,
  filterTransactions,
  categoryHighRange,
};
