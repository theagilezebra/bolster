// #! <node path inside of the heroku instance, find by using heroku run bash and which node>
const User = require('../database/models/user');
const AchievementType = require('../database/models/achievementType');
const transactions = require('../server/controllers/transactions');
const plaid = require('../server/controllers/plaid');
// const achievementCalculator = require('some file that colby makes');

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
      console.log(achievements);
      console.log(purchases);
      for (let i = 0; i < achievements.length; i += 1) {
        // achievementCalculator[achievements[i].attributes.name](purchases);
        // update transaction
      }
    }))))
  .catch((err) => {
    console.log(err);
  });
}

updateTransactions();
