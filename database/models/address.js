const db = require('../database');
const User = require('./user');
const Business = require('./business');
const Achievement = require('./achievement');
const AchievementType = require('./achievementType');

module.exports = db.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,
  users: () => this.hasMany(User),
  businesses: () => this.hasMany(Business),
  initialize() {
    this.on('created', (address) => {
      AchievementType.forge({ name: 'Home sweet home' }).fetch()
      .then(achievementType => Achievement.forge().where({
        achievementtypes_id: achievementType.id,
        user_id: address.attributes.user_id,
      }).fetch())
      .then((achievement) => {
        if (!achievement.attributes.status) {
          achievement.attributes.status = true;
          achievement.save();
        }
      })
      .catch((err) => {
        console.log(err);
      });
    });
  },
});
