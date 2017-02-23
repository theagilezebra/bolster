const db = require('../database');
const Achievement = require('./achievement');

module.exports = db.Model.extend({
  tableName: 'achievementTypes',
  hasTimestamps: true,
  achievements: () => this.hasMany(Achievement),
});
