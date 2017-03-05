const { assert } = require('chai');
const { parseDate } = require('../client/helpers/goalHelpers.jsx');

describe('Goal Helpers', () => {
  describe('parseDate', () => {
    it('should convert human readable date into YYYY-MM-DD format', () => {
      assert.equal(parseDate('March 29th 2016'), '2016-03-29');
      assert.equal(parseDate('November 1st 3072'), '3072-11-01');
    });
  });
});
