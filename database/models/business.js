const db = require('../database');
const Transaction = require('./transaction');
const Category = require('./category');
const Address = require('./address');

module.exports = db.Model.extend({
  tableName: 'businesses',
  hasTimestamps: true,
  transactions: () => this.hasMany(Transaction),
  category: () => this.belongsTo(Category),
  address: () => this.belongsTo(Address),
});
