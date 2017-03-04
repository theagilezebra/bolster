const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const Account = require('../models/account');

const helpers = require('../../server/helpers');

const user = {
  email: 'george@costanza.com',
  password: 'seinfeld4life',
  lastName: 'Costanza',
  firstName: 'George',
  address_id: 1,
  phone: '',
};
const { email, password, firstName, lastName } = user;

// find the user
// if he exists
  // cool, grab his id
// else
  // create it
// delete all his accounts and achievements
// populate the database
let userId;

const encrypt = pass => new Promise((resolve, reject) => {
  bcrypt.hash((pass), null, null, (err, hash) => {
    if (err) reject(err);
    else resolve(hash);
  });
});

User.forge({ email }).fetch()
.then(userInstance => userInstance || encrypt(password).then((hash) => {
  user.password = hash;
  User.forge(user).save();
}))
.then((userInstance) => {
  userId = user.id;
  return userInstance;
});
  // if (userInstance) {
  //   userId = userInstance.id;
  //   return userInstance;
  // }
  // bcrypt.hash((password), null, null, (err, hash) => {
  //   user.password = hash;
  //   return User.forge(user).save();
  // });

  // return user || 'create user promise';


// find or create the user in database


// find or create a bank account
// institutionName: Bank of America
// accountType: checking account
// plaidAccountId: 0123456789
// availableBalance: 1000000
// currentBalance: 1000000
// user_id: to be provided after having found / created George Costanza

// bulk create the transactions
