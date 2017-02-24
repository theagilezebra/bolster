import moment from 'moment';

const getTotal = purchases => purchases.reduce((prev, curr) => prev += curr.amount, 0);

const getAverage = (days, transactions) => {
  const total = getTotal(transactions);
  console.log('total', total);
  console.log('days', days);
  return Math.round(total / days);
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
    curr++;
  }
  console.log('timeframe', results);
  return results;
};
// this is a rolling average
const previousMonth = (start, period, transactions) => {
  const startDate = moment(start).subtract(1, 'month');
  const purchases = filterPurchases(startDate, 30, transactions);
  console.log('purchases from previous month', purchases);
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

module.exports = {
  getAverage,
  timeFrame,
  filterPurchases,
  progressBar,
  previousMonth,
};