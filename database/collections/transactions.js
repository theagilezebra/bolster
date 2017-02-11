const db = require('../database');
const Transaction = require('../models/transaction');

const Transactions = new db.Collection();
Transactions.model = Transaction;
module.exports = Transactions;
