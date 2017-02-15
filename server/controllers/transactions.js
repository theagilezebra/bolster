const axios = require('axios');

const Transaction = require('../../database/models/transaction');
const Business = require('../../database/models/business');
const Category = require('../../database/models/category');
const Address = require('../../database/models/address');
const Account = require('../../database/models/account');
const helpers = require('../helpers');

module.exports = {
  get: (req, res) => Transaction.forge().where(req.query).fetchAll()
    .then(transactions => Promise.all(transactions.models.map(transaction => Business.forge({ id: transaction.attributes.business_id }).fetch()
      .then((business) => {
        transaction.attributes.name = business.attributes.name;
        delete transaction.attributes.business_id;
        return transaction;
      }))))
    .then(transactions => Promise.all(transactions.map((transaction) => {
      transaction.attributes.categories = [];
      return Promise.all((JSON.parse(transaction.attributes.category_id).map(id => Category.forge({ id }).fetch()
      .then((category) => {
        transaction.attributes.categories.push(category.attributes.name);
        delete transaction.attributes.category_id;
      }))))
      .then(() => transaction);
    })))
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      res.status(404).json(err);
    }),

  bulkCreate: (transactions, userId) => Promise.all(transactions.map((transaction) => {
    let categoryIds;
    let businessId;
    transaction.category = transaction.category || ['Uncategorized'];
    return Promise.all(transaction.category.map(name => helpers.findOrCreate(Category, { name })))
    .then(records => categoryIds = records.map(record => record.id))
    .then((records) => {
      if (transaction.meta.location.coordinates) {
        delete transaction.meta.location.coordinates;
      }
      return helpers.findOrCreate(Address, transaction.meta.location);
    })
    .then((address) => {
      const businessAttributes = {
        name: transaction.name,
        address_id: address.id,
        category_id: JSON.stringify(categoryIds),
      };
      return helpers.findOrCreate(Business, businessAttributes);
    }).then((business) => {
      businessId = business.id;
      return helpers.findOrCreate(Account, { plaidAccountId: transaction._account });
    }).then((account) => {
      const transactionAttributes = {
        user_id: userId,
        account_id: account.id,
        business_id: businessId,
        category_id: JSON.stringify(categoryIds),
        amount: transaction.amount,
        date: transaction.date,
      };
      if (categoryIds.includes('transfer') || categoryIds.includes('withdrawal')) {
        delete transactionAttributes.business_id;
      }
      return helpers.findOrCreate(Transaction, transactionAttributes);
    }).catch((err) => {
      console.log(err);
    });
  })),
};
