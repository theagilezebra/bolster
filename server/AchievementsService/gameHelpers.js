const moment = require('moment');

const getTotal = purchases => purchases.reduce((prev, curr) => prev += +curr.attributes.amount, 0);

const getAverage = (days, transactions) => {
  if (transactions.length === 0) return 0;
  const total = getTotal(transactions);
  return (total / days).toFixed(2);
};

function slicePurchasesByDate(transactions, startDate, endDate) {
  if (arguments.length === 2 && !Date.parse(startDate)) throw new Error('Please provide a valid date');
  if (arguments.length === 3 && (!Date.parse(startDate) || !Date.parse(endDate))) throw new Error('Please provide a valid date');
  startDate = Date.parse(startDate);
  endDate = Date.parse(endDate);
  return transactions.filter((transaction) => {
    if (transaction === undefined) return false;
    const date = Date.parse(transaction.attributes.date);
    return arguments.length === 2 ? date >= startDate : date >= startDate && date <= endDate;
  });
}

const categoryHighRange = (category) => {
  if (category === 'undefined' || category.length !== 8 || typeof category !== 'string') {
    throw new Error('please provide a valid category');
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

const filterPurchasesByCategory = (transactions, category) => {
  const highRange = categoryHighRange(category);
  return transactions.filter((transaction) => {
    if (transaction === undefined) return false;
    const filter = category !== highRange &&
      +transaction.attributes.category_id >= +category &&
      +transaction.attributes.category_id <= +highRange;
    return filter ? transaction : transaction.attributes.category_id === category;
  });
};

const timeFrame = (start, days) => {
  const results = [];
  results.push(moment(start, 'MM-DD-YYYY'));
  if (!days) {
    return results;
  }
  let previous = results[0];
  let curr = 1;
  while (curr < days) {
    const date = moment(previous, 'MM-DD-YYYY').add(1, 'day');
    results.push(date);
    previous = moment(date);
    curr += 1;
  }
  return results;
};

const filterPurchases = (start, days, transactions) => {
  const time = timeFrame(start, days);
  return transactions.filter((purchase) => {
    if (purchase === undefined) return false;
    return time.includes(moment(purchase.date, 'MM-DD-YYYY'));
  });
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


const progressBar = (start, days, period, transactions) => {
  const comparison = previousMonth(start, period, transactions);
  // gets purchases from start date until date x number of days away
  const purchases = filterPurchases(start, days, transactions);
  // totals periods from that time period
  const total = getTotal(purchases);
  // averages periods from that time period
  const average = getAverage(purchases.length, purchases);
  if (comparison === 0) return 1;
  return (average / comparison).toFixed(2);
};

/* ////////////////////////  ACHIEVEMENT FUNCTIONS  //////////////////////// */

const trappistMonk = (start, days, transactions) => {
  const totes = getTotal(slicePurchasesByDate(transactions, moment().subtract(days, 'days').toString()));
  return { status: !(totes > 0) };
};

const hero = (start, days, period, transactions) => {
  const total = getTotal(filterPurchases(start, days, transactions)).toFixed(2);
  // this produces either a daily or weekly average from the last month based on which period is passed as an argument
  const prevMonthAverage = previousMonth(start, period, transactions);
  const percentage = progressBar(start, days, period, transactions.filter(transaction => transaction));
  return {
    total,
    average: prevMonthAverage,
    percentage,
  };
};

// Generates achievements of the following type: Reduce spending in category x by y% over period z
const periodicAchievementGenerator = ({ category, percentage = 0.3, period = 30, purchases, creationDate }) => {
  let historicalAverage = slicePurchasesByDate(purchases, 0, creationDate);
  if (category) historicalAverage = filterPurchasesByCategory(historicalAverage, category);
  historicalAverage = getAverage(period, historicalAverage);
  const periodAgo = moment().subtract(period, 'days').toString();
  const purchasesOfPeriod = slicePurchasesByDate(purchases, periodAgo);
  const spendingOfPeriod = getTotal(purchasesOfPeriod);
  if (!spendingOfPeriod) return { percentage: 0 };
  const spendingReduction = 1 - (spendingOfPeriod / historicalAverage);
  return spendingReduction >= percentage ? { status: true } : { percentage: spendingReduction / percentage };
};


module.exports = {
  getAverage,
  timeFrame,
  filterPurchases,
  filterPurchasesByCategory,
  categoryHighRange,
  slicePurchasesByDate,
  progressBar,
  previousMonth,
  trappistMonk,
  hero,
  periodicAchievementGenerator,
};
