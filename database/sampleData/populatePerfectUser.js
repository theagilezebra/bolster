const moment = require('moment');
const User = require('../models/user');
const Goal = require('../models/goal');
const bcrypt = require('bcrypt-nodejs');
const Account = require('../models/account');
const Achievement = require('../models/achievement');
const transactionsController = require('../../server/controllers/transactions');

const helpers = require('../../server/helpers');
const perfectUser = require('./perfectUser');

const user = {
  email: 'george@costanza.com',
  password: 'seinfeld4life',
  lastName: 'Costanza',
  firstName: 'George',
  address_id: 1,
  phone: '',
};
const { email, password, firstName, lastName } = user;

const accountObject = {
  institutionName: 'Bank of America',
  accountType: 'checking account',
  plaidAccountId: '0123456789',
  availableBalance: 10000,
  currentBalance: 10000,
  name: 'my sole account',
};

let userId;

const encrypt = pass => new Promise((resolve, reject) => {
  bcrypt.hash((pass), null, null, (err, hash) => {
    if (err) reject(err);
    else resolve(hash);
  });
});

module.exports = function populatePerfectUser() {
  User.forge({ email }).fetch()
  .then(userInstance => userInstance || encrypt(password).then((hash) => {
    user.password = hash;
    User.forge(user).save();
  }))
  .then((userInstance) => {
    userId = userInstance.id;
    return Account.forge({ institutionName: 'Bank of America', user_id: user.id }).fetchAll({ withRelated: ['transactions'] });
  })
  .then(accounts => Promise.all(accounts.models.map(account => Promise.all(account.relations.transactions.map(transaction => transaction.destroy()))))
    .then(() => Promise.all(accounts.map(account => account.destroy()))))
  .then(() => Goal.where({ user_id: userId }).fetch().then((goal) => { if (goal) goal.destroy(); }))
  .then(() => User.forge({ id: userId }).save({ publicToken: null, accessToken: null }))
  .then(() => Achievement.where({ user_id: userId }).fetchAll())
  .then(achievements => Promise.all(achievements.map(achievement => achievement.save({ status: false, percentage: 0 }))))
  .then(() => Goal.forge({
    name: 'hair transplant',
    amount: 700,
    startDate: moment().subtract(32, 'day').toDate(),
    endDate: moment().add(62, 'day').toDate(),
    user_id: userId,
  }).save())
  .then(() => {
    accountObject.user_id = userId;
    return Account.forge(accountObject).save();
  })
  .then(() => {
    let transactions = perfectUser({ startDate: moment().subtract(31, 'day').toDate(), endDate: new Date() });
    transactions = transactions.concat(perfectUser({ startDate: new Date(), endDate: moment().add(31, 'day').toDate(), drinkingOut: 149 }));
    return transactionsController.bulkCreate(transactions, userId);
  })
  .catch(err => console.log(err));
};
