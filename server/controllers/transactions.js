const axios = require('axios');

const Transaction = require('../../database/models/transaction');
const Business = require('../../database/models/business');
const Category = require('../../database/models/category');
const Address = require('../../database/models/address');
const Account = require('../../database/models/account');
const helpers = require('../helpers');

module.exports = {
  get: (req, res) => Transaction.forge().where({ user_id: req.query.id }).fetchAll()
    .then(transactions => Promise.all(transactions.models.map(transaction => Business.forge({ id: transaction.attributes.business_id }).fetch()
    .then((business) => {
      transaction.attributes.name = business.attributes.name;
      delete transaction.attributes.business_id;
      return transaction;
    }))))
    .then(transactions => Promise.all(transactions.map(transaction => Category.forge({ id: transaction.attributes.category_id }).fetch()
    .then((category) => {
      transaction.attributes.categories = JSON.parse(category.attributes.categories);
      delete transaction.attributes.category_id;
      return transaction;
    }))))
    .then(transactions => Promise.all(transactions.map((transaction) => {
      delete transaction.attributes.created_at;
      delete transaction.attributes.updated_at;
      return transaction;
    })))
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      res.status(404).json(err);
    }),

  bulkCreate: (transactions, userId) => Promise.all(transactions.map((transaction) => {
    let category;
    let businessId;
    const categories = JSON.stringify(transaction.category) || '["Uncategorized"]';
    return helpers.findOrCreate(Category, { categories })
    .then((record) => {
      category = record;
      if (transaction.meta.location.coordinates) {
        delete transaction.meta.location.coordinates;
      }
      return transaction.meta.location.address ? helpers.findOrCreate(Address, transaction.meta.location) : transaction;
    })
    .then((address) => {
      const businessAttributes = {
        name: transaction.name,
        address_id: address.id,
        category_id: category.id,
      };
      if (!address.address) {
        delete businessAttributes.address_id;
      }
      return helpers.findOrCreate(Business, businessAttributes);
    }).then((business) => {
      businessId = business.id;
      return helpers.findOrCreate(Account, { plaidAccountId: transaction._account });
    }).then((account) => {
      const transactionAttributes = {
        user_id: userId,
        account_id: account.id,
        business_id: businessId,
        category_id: category.id,
        amount: transaction.amount,
        date: transaction.date,
      };
      // if (category === 'transfer' || category === 'withdrawal') {
      //   delete transactionAttributes.business_id;
      // }
      return helpers.findOrCreate(Transaction, transactionAttributes);
    }).catch((err) => {
      console.log(err);
    });
  })),
};
