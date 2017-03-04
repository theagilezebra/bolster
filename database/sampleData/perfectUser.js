const moment = require('moment');
const purchaseTypes = require('./purchaseTypes');

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

function budgetMaker({ drinkingOut = 500, eatingOut = 500, entertainment = 200, utilities = 250, clothesShopping = 200, foodShopping = 800, transportation = 200, startDate, endDate }) {
  // count length of period
  // adapt budget values such that what is passed into function is a monthly target

  const categories = { drinkingOut, eatingOut, entertainment, utilities, clothesShopping, foodShopping, transportation };
  const categoryKeys = Object.keys(categories);
  const transactions = [];
  for (let i = 0; i < categoryKeys.length; i += 1) {
    let total = 0;
    while (total < categories[categoryKeys[i]]) {
      const transaction = purchaseTypes[categoryKeys[i]];
      transaction.date = moment(randomDate(startDate, endDate)).format('MM-DD-YYYY');
      transaction.amount = randomAmount(3, 100);
      total += +transaction.amount;
      transactions.push(transaction);
    }
  }
  return transactions;
}

const budget = budgetMaker({ startDate: new Date(2016, 11, 30), endDate: new Date() });
console.log('BUDGET', JSON.stringify(budget));

// set the date the user is created at (probably today)
// set purchases in the future

// a few possible scenarios:
  // script run whenever the user logs in. deletes that user's transactions, creates new ones based on the script.
  // run it when someone hits our site (even if they don't log in)
  // run it every few days. deletes that user's transactions and repopulates them
  // run it once and let it hang. Possible, but data will go stale.
