const { expect, assert } = require('chai');
const { mapCategories } = require('../client/helpers/transactionHelpers.jsx');
const sampleData = require('../database/samplePlaidData.json');

describe('mapCategories transaction helper functions', () => {
  it('should produce an object', () => {
    const mappedTransactions = mapCategories(sampleData.transactions);
    assert(mappedTransactions).to.be.a('object');
  });
});
