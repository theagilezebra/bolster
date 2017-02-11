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
});
