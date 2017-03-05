const moment = require('moment');
const purchaseTypes = require('./purchaseTypes');

function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - (Math.random() * Math.pow(36, length)))).toString(36).slice(1);
}

function randomDate(start, end) {
  return new Date(start.getTime() + (Math.random() * (end.getTime() - start.getTime())));
}

function randomAmount(lowRange, highRange) {
  if (lowRange === undefined ||
      highRange === undefined ||
      lowRange <= 0 ||
      highRange < lowRange) throw new Error('please enter a valid range');
  return ((Math.random() * (highRange - lowRange)) + lowRange).toFixed(2);
}

function transactionBuilder({ drinkingOut = 500, eatingOut = 500, entertainment = 200, utilities = 250, clothesShopping = 200, foodShopping = 800, transportation = 200, startDate, endDate }) {
  const categories = { drinkingOut, eatingOut, entertainment, utilities, clothesShopping, foodShopping, transportation };
  const categoryKeys = Object.keys(categories);
  const transactions = [];
  for (let i = 0; i < categoryKeys.length; i += 1) {
    let total = 0;
    while (total < categories[categoryKeys[i]]) {
      const transaction = Object.assign({}, purchaseTypes[categoryKeys[i]]);
      transaction.date = moment(randomDate(startDate, endDate)).format('MM-DD-YYYY');
      transaction.amount = randomAmount(3, 100);
      transaction._id = randomString(37);
      total += +transaction.amount;
      transactions.push(transaction);
    }
  }
  return transactions;
}

module.exports = transactionBuilder;
