// #! <node path inside of the heroku instance, find by using heroku run bash and which node>
const User = require('../database/models/user');
const AchievementType = require('../database/models/achievementType');
const transactions = require('../server/controllers/transactions');
const plaid = require('../server/controllers/plaid');
const gameHelpers = require('../server/AchievementsService/gameHelpers');
const achievementCalculator = require('../server/AchievementsService/achievementCalculators');

function updateTransactions() {
  let achievements;
  AchievementType.forge().fetchAll()
  .then((achievementList) => {
    achievements = achievementList.models;
    return User.forge().fetchAll();
  })
  .then(users => Promise.all(users.models.map(user => plaid.transactions.get(user.id)
    .then(results => results.data.transactions)
    .then(purchases => transactions.bulkCreate(purchases, user.id))
    .then((purchases) => {
      // TODO: there is an issue with the transactions: some purchases come back undefined, and we get too many (12) compared to what is in the DB (9)
      // const config = { creationDate: user.attributes.created_at, category: '13005000', purchases };
      // console.log(gameHelpers.periodicAchievementGenerator(config));
      for (let i = 0; i < achievements.length; i += 1) {
        console.log('----------', achievements);
        if (achievements[i].attributes.structure !== 'profile') {
          achievementCalculator[achievements[i].attributes.name](purchases);
        }
        // update transaction
      }
    }))))
  .catch((err) => {
    console.log(err);
  });
}

updateTransactions();
