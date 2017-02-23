const db = require('../database');
const User = require('./user.js');
const Achievement = require('./achievement.js');

module.exports = db.Model.extend({
  tableName: 'achievementtypes',
  hasTimestamps: true,
  achievements: () => this.hasMany(Achievement),
  initialize() {
    this.on('created', (achievementType) => {
      require('./user').fetchAll()
      .then(users => Promise.all(users.models.map(user => require('./achievement.js').forge({
        user_id: user.id,
        achievementtypes_id: achievementType.id,
      }).save())))
      .catch((err) => {
        console.log('ERROR', err);
      });
    });
  },

  delete() {
    return new Promise((resolve, reject) => {
      console.log('THIS INSIDE ARROW FUNCTION, YAY FOR ARROW FUNCTIONS!?!?', this);
      require('./achievement.js').forge().where({ achievementtypes_id: this.id }).fetchAll()
      .then(achievements => Promise.all(achievements.models.map(achievement => achievement.destroy())))
      .then(() => this.destroy())
      .then((destroyed) => {
        resolve(destroyed);
      })
      .catch((err) => {
        reject(err);
      });
    });
  },
});
