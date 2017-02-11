const db = require('../database');
const User = require('./user');
const Transaction = require('./transaction');

module.exports = db.Model.extend({
  tableName: 'accounts',
  hasTimestamps: true,
  transactions: () => this.hasMany(Transaction),
  user: () => this.belongsTo(User),
});
