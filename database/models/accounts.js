const db = require('../connection').connection;

module.exports = db.Model.extend({
  tableName: 'accounts',
  hasTimestamps: true,
});
