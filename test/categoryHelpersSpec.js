const { assert } = require('chai');
const { trimCategories } = require('../client/helpers/categoryHelpers.jsx');

describe('Category Helpers', () => {
  describe('trimCategories', () => {
    const trimmedList = trimCategories([
      { categories: '["First", "Uncategorized"]' },
      { categories: '["First", "1"]' },
      { categories: '["First", "2"]' },
      { categories: '["Second", "Uncategorized"]' },
      { categories: '["Second", "3"]' },
      { categories: '["Second", "4"]' },
    ]);

    it('should create keys for first tier categories', () => {
      const categoryKeys = ['First', 'Second'];
      categoryKeys.forEach((category, index) => {
        assert.equal(category, Object.keys(trimmedList)[index]);
      });
    });

    it('should prepend Uncategorized to every subcategory array', () => {
      for (const category in trimmedList) {
        assert.equal(trimmedList[category][0], 'Uncategorized');
      }
    });

    it('should push subcategories to their corresponding maincategories', () => {
      assert.equal(JSON.stringify(trimmedList.First.slice(1)), '["1","2"]');
      assert.equal(JSON.stringify(trimmedList.Second.slice(1)), '["3","4"]');
    });
  });
});
