const { expect, assert } = require('chai');
const { sortByDate, dateLabels } = require('../client/helpers/chartHelpers.jsx');

describe('sortByDate helper function', () => {
  it('sortByDate should sort transactions by date', () => {
    const transactions = [
     { amount: 100, date: '2017-02-24' },
     { amount: 56, date: '2017-02-02' },
     { amount: 32, date: '2017-02-27' },
     { amount: 100, date: '2017-02-22' },
    ];
    assert.equal(transactions.sort(sortByDate)[0].date, '2017-02-02');
    assert.equal(transactions.sort(sortByDate)[1].date, '2017-02-22');
    assert.equal(transactions.sort(sortByDate)[2].date, '2017-02-24');
    assert.equal(transactions.sort(sortByDate)[3].date, '2017-02-27');
  });
});

describe('dateLabels helper function', () => {
  const unformattedLabels = {
    '2017-02-24': 100,
    '2017-02-02': 56,
    '2017-02-27': 32,
    '2017-02-22': 100,
  };
  const variedFormats = {
    '02-24-2017': 100,
    '02/02/2017': 56,
    '2017-02-27': 32,
    '2017-02-22': 100,
  };
  it('should reformat dates to Month, Day Year', () => {
    const formattedLabels = dateLabels(unformattedLabels);
    expect(unformattedLabels).to.be.a('object');
    assert.equal(formattedLabels[0], 'February 24th 2017');
    assert.equal(formattedLabels[1], 'February 2nd 2017');
    assert.equal(formattedLabels[2], 'February 27th 2017');
    assert.equal(formattedLabels[3], 'February 22nd 2017');
  });
  it('should reformat different format inputs', () => {
    const formattedLabels = dateLabels(variedFormats);
    expect(variedFormats).to.be.a('object');
    assert.equal(formattedLabels[0], 'February 24th 2017');
    assert.equal(formattedLabels[1], 'February 2nd 2017');
    assert.equal(formattedLabels[2], 'February 27th 2017');
    assert.equal(formattedLabels[3], 'February 22nd 2017');
  });
});
