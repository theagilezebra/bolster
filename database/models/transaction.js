const db = require('../database');
const User = require('./user');
const Account = require('./account');
const Business = require('./business');
const Category = require('./category');

module.exports = db.Model.extend({
  tableName: 'transactions',
  hasTimestamps: true,
  user: () => this.belongsTo(User),
  account: () => this.belongsTo(Account),
  business: () => this.belongsTo(Business),
  categories: () => this.belongsTo(Category),
  initialize() {
    this.on('created', ({ attributes }) => {
      const Transaction = require('./transaction');
      const { business_id, id } = attributes;
      Business.where({ id: business_id }).fetch()
      .then(business => business.attributes.category_id)
      .then(category_id => Transaction.forge({ id }).save({ category_id }))
      .catch((err) => {
        console.log(err);
      });
    });
  },
});
