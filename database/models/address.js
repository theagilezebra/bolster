const db = require('../database');
const User = require('./user');
const Business = require('./business');

module.exports = db.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,
  users: () => this.hasMany(User),
  businesses: () => this.hasMany(Business),
});
