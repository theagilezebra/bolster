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
      // TODO:
      // This is the right intent, but needs to be redone
        // wait for a few seconds before doing the followwing (use setTimeout)
        // fetch all users
        // if a user has this address id as their address foreign key
        // find the achievement matching name home sweet home and this user.id
        // set its status to true

      // AchievementType.forge({ name: 'Home sweet home' }).fetch()
      // .then(achievementType => Achievement.forge().where({
      //   achievementtypes_id: achievementType.id,
      //   user_id: address.attributes.user_id,
      // }).fetch())
      // .then((achievement) => {
      //   if (!achievement.attributes.status) {
      //     achievement.attributes.status = true;
      //     achievement.save();
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    });
  },
});
