// #! <node path inside of the heroku instance, find by using heroku run bash and which node>
const User = require('../database/models/user');
const Achievement = require('../database/models/achievement');
const AchievementType = require('../database/models/achievementType');
const transactions = require('../server/controllers/transactions');
const plaid = require('../server/controllers/plaid');
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
    .then(purchases => Promise.all(achievements.map((achievement) => {
      if (achievement.attributes.structure !== 'profile') {
        const calculation = achievementCalculator[achievement.attributes.name](purchases);
        return Achievement.forge({ user_id: user.id, achievementtypes_id: achievement.id }).fetch()
        .then((achievementInstance) => {
          if (!achievementInstance.attributes.status) {
            return achievementInstance.save(calculation);
          }
        });
      }
    }))))))
  .catch((err) => {
    console.log(err);
  });
}

updateTransactions();

 // TODO: there is an issue with the transactions: some purchases come back undefined, and we get too many (12) compared to what is in the DB (9)
