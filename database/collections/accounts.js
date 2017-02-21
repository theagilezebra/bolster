const db = require('../database');
const Account = require('../models/account');

const Accounts = new db.Collection();
Accounts.model = Account;
module.exports = Accounts;
