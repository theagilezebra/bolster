const db = require('../database');
const User = require('./user');

module.exports = db.Model.extend({
  tableName: 'categories',
  hasTimestamps: true,
  user: () => this.belongsTo(User),
});
