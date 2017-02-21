const db = require('../database');
const User = require('./user');

module.exports = db.Model.extend({
  tableName: 'goals',
  hasTimestamps: true,
  user: () => this.belongsTo(User),
});
