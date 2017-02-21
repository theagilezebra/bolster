const db = require('../database');
const User = require('./user');
const Category = require('./category');

module.exports = db.Model.extend({
  tableName: 'budgets',
  hasTimestamps: true,
  category: () => this.belongsTo(Category),
  user: () => this.belongsTo(User),
});
