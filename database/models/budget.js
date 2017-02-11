const db = require('../database');
const Category = require('./category');

module.exports = db.Model.extend({
  tableName: 'categories',
  hasTimestamps: true,
  category: () => this.belongsTo(Category),
});
