const { expect, assert } = require('chai');
const { mapCategories } = require('../client/helpers/transactionHelpers.jsx');
const sampleData = require('../database/samplePlaidData.json');

describe('mapCategories transaction helper functions', () => {
  it('should produce an object', () => {
    const mappedTransactions = mapCategories(sampleData.transactions);
    assert(mappedTransactions).to.be.a('object');
  });
});


// const mapCategories = (transactions) => {
//   const mapped = {};
//   transactions.forEach((item) => {
//     if (item.categories[0] !== 'Transfer' && item.categories[0] !== 'Interest') {
//       if (mapped[item.categories[0]] === undefined) {
//         mapped[item.categories[0]] = item.amount;
//       } else {
//         mapped[item.categories[0]] = Math.round(mapped[item.categories[0]] += item.amount);
//       }
//     }
//   });
//   return mapped;
// };
