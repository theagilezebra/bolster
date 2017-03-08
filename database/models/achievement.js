const nodemailer = require('nodemailer');
const db = require('../database');
const AchievementType = require('./achievementType');
const User = require('./user');

module.exports = db.Model.extend({
  tableName: 'achievements',
  hasTimestamps: true,
  achievementType: () => this.belongsTo(AchievementType),
  user: () => this.belongsTo(User),
  initialize() {
    this.on('updating', ({ attributes }) => {
      if (!this.changed.status) return;
      let name;
      let email;
      let achievementName;
      let description;

      require('./user').where({ id: attributes.user_id }).fetch()
      .then((user) => {
        name = user.attributes.firstName;
        email = user.attributes.email;
        return user;
      })
      .then(() => AchievementType.where({ id: attributes.achievementtypes_id }).fetch()
      .then((achievementtype) => {
        achievementName = achievementtype.attributes.name;
        description = achievementtype.attributes.description;
        return achievementtype;
      }))
      .then(() => nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'bolsteryourbudget@gmail.com',
          pass: process.env.EMAIL_PASSWORD,
        },
      })
      .sendMail({
        from: '"Bolster" <bolsteryourbudget@gmail.com>',
        to: `${email}`,
        subject: 'Achievement unlocked!',
        text: `Nice job ${name}!, You've earned an achievement!`,
        html: `Nice job ${name}!, You've earned the achievement<h1>${achievementName}</h1>` +
              `for completing the following requirement --<br><b>${description}<b>`,
      }, (err, info) => err
        ? console.log(err)
        : console.log('Message %s sent: %s', info.messageId, info.response)));
    });
  },
});
