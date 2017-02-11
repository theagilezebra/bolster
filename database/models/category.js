const db = require('../database');
const Transaction = require('./transaction');
const Business = require('./business');
const Budget = require('./budget');

module.exports = db.Model.extend({
  tableName: 'categories',
  hasTimestamps: true,
  transactions: () => this.hasMany(Transaction),
  businesses: () => this.hasMany(Business),
  budgets: () => this.hasMany(Budget),
});
