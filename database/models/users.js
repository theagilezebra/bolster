const db = require('../connection').connection;

module.exports = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
});
