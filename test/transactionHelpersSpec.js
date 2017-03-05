const { expect, assert } = require('chai');
const {
  mapCategories,
  labelize,
  populateChart,
  convertTransactions,
  overwriteTransactionCategories,
  getDailySpendingAverage,
} = require('../client/helpers/transactionHelpers.jsx');

const sampleData = [
  { account_id: 1, amount: 34.23, categories: ['Food and Drink', 'Restaurant'], date: '02/23/2017', id: 1, name: 'TacoPlace', user_id: 1 },
  { account_id: 1, amount: 10.01, categories: ['Transfer'], date: '02/24/2017', id: 2, name: 'Bank Fee', user_id: 1 },
  { account_id: 1, amount: 54.23, categories: ['Shops', 'Pets'], date: '02/25/2017', id: 3, name: 'PetSmart', user_id: 1 },
  { account_id: 1, amount: 3.45, categories: ['Interest'], date: '02/25/2017', id: 4, name: 'Savings interest', user_id: 1 },
];

describe('Transaction Helpers', () => {
  describe('mapCategories transaction helper functions', () => {
    const mappedTransactions = mapCategories(sampleData);
    it('should produce an object', () => {
      expect(mappedTransactions).to.be.a('object');
    });
    it('should ignore Transfer and Interest categories', () => {
      expect(Object.keys(mappedTransactions).length).to.equal(2);
      expect(mappedTransactions).to.not.have.any.keys('Interest', 'Transfer');
    });
    it('should use the first item in the categories array as the key', () => {
      expect(Object.keys(mappedTransactions)[0]).to.equal(sampleData[0].categories[0]);
      expect(Object.keys(mappedTransactions)[1]).to.equal(sampleData[2].categories[0]);
    });
    it('should pair item amounts as values for each date key', () => {
      expect(mappedTransactions[sampleData[0].categories[0]]).to.equal(sampleData[0].amount);
      expect(mappedTransactions[sampleData[2].categories[0]]).to.equal(sampleData[2].amount);
    });
  });

  describe('labelize transaction helper function', () => {
    const labelizedTransactions = labelize(sampleData);
    it('should produce and array', () => {
      expect(labelizedTransactions).to.be.a('array');
    });
    it('should ignore Transfer and Interest categories', () => {
      expect(labelizedTransactions).not.include('Transfers', 'Interest');
    });
    it('should use the first item in the transaction categories array to produce array', () => {
      expect(labelizedTransactions[0]).to.equal('Food and Drink');
      expect(labelizedTransactions[1]).to.equal('Shops');
    });
  });

  describe('populateChart transaction helper function', () => {
    const chartConfiguration = populateChart(sampleData);
    it('should produce labels for a chart', () => {
      expect(chartConfiguration.labels).to.be.a('array');
      expect(chartConfiguration.labels[0]).to.equal('Food and Drink');
      expect(chartConfiguration.labels[1]).to.equal('Shops');
    });
    it('should produce a an array of data from transaction amounts', () => {
      expect(chartConfiguration.datasets[0].data[0]).to.equal(34.23);
      expect(chartConfiguration.datasets[0].data[1]).to.equal(54.23);
    });
  });

  describe('convertTransactions', () => {
    const convertedTransactions = convertTransactions([
      { amount: '222.22', date: '2016-06-22T07:00:00.000Z', categories: ['First'] },
      { amount: '18', date: '2025-11-18T07:00:00.000Z', categories: ['First'] },
    ]);

    it('should convert transaction amounts to numbers', () => {
      convertedTransactions.forEach((transaction) => {
        assert.equal(typeof transaction.amount, 'number');
      });
    });

    it('should slice trailing timestamp from transaction dates', () => {
      convertedTransactions.forEach((transaction) => {
        assert.equal(transaction.date.length, 10);
      });
    });

    it('should append Uncategorized to transactions lacking a subcategory', () => {
      convertedTransactions.forEach((transaction) => {
        assert.equal(transaction.categories[1], 'Uncategorized');
      });
    });
  });

  describe('overwriteTransactionCategories', () => {
    let previousTransaction = [{ id: 1, amount: 10, date: '2016-06-22T', categories: ['First', 'Previous'] }];
    previousTransaction = overwriteTransactionCategories(previousTransaction, [{ id: 1, amount: 10, date: '2016-06-22T', categories: ['First', 'Updated'] }]);

    it('should overwrite transactions of a specified id', () => {
      assert.equal(JSON.stringify(previousTransaction[0].categories), '["First","Updated"]');
    });
  });

  describe('getDailySpendingAverage', () => {
    const dailyAverage = getDailySpendingAverage([
      { amount: 120, date: '2016-06-22' },
      { amount: 500, date: '2016-06-24' },
      { amount: 70, date: '2016-06-28' },
    ]);

    it('should output a daily spending average from a list of transactions', () => {
      assert.equal(dailyAverage, 115);
    });
  });
});
