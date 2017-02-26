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
    .then(transactions => Promise.all(transactions.map(transaction => Category.forge({ id: transaction.attributes.category_id }).fetch()
    .then((category) => {
      transaction.attributes.categories = JSON.parse(category.attributes.categories);
      delete transaction.attributes.category_id;
      return transaction;
    }))))
    .then(transactions => Promise.all(transactions.map((transaction) => {
      delete transaction.attributes.created_at;
      delete transaction.attributes.updated_at;
      delete transaction.attributes.plaidTransactionId;
      return transaction;
    })))
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      res.status(404).json(err);
    }),

  bulkCreate: (transactions, userId) => Promise.all(transactions
  .filter(transaction => transaction.amount > 0)
  .map((transaction) => {
    let category;
    let businessId;
    const categories = JSON.stringify(transaction.category) || '["Uncategorized", "Uncategorized"]';
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
        plaidTransactionId: transaction._id,
        amount: transaction.amount,
        date: transaction.date,
      };
      return helpers.findOrCreate(Transaction, transactionAttributes);
    }).catch((err) => {
      console.log(err);
    });
  })),


  update: (req, res) => {
    let category_id;
    const { id, categories, user_id } = req.body;
    return Category.forge().where({ categories }).fetch()
    .then(({ attributes }) => attributes.id)
    .then((categoryId) => {
      category_id = categoryId;
      return Transaction.forge({ id, user_id }).fetch({ require: true });
    })
    .then(transaction => helpers.findOrCreate(Business, { id: transaction.attributes.business_id })
    .then(business => Business.forge().where({ name: business.attributes.name }).fetchAll()
    .then((businesses) => {
      businesses.models.forEach((businessInstance) => {
        businessInstance.save({ category_id }, { patch: true });
        Transaction.forge().where({ user_id, business_id: businessInstance.attributes.id }).fetchAll()
        .then((transactions) => {
          transactions.models.forEach((transactionInstance) => {
            transactionInstance.save({ category_id }, { patch: true });
          });
        });
      });
    })))
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(404).json(err);
    });
  },
};
