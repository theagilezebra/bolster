const db = require('../database');
const Transaction = require('./transaction');
const Category = require('./category');
const Address = require('./address');

module.exports = db.Model.extend({
  tableName: 'businesses',
  hasTimestamps: true,
  transactions: () => this.hasMany(Transaction),
  category: () => this.belongsTo(Category),
  address: () => this.belongsTo(Address),
  initialize() {
    this.on('created', ({ attributes }) => {
      const Business = require('./business');
      const { name, id } = attributes;
      Business.where({ name }).fetch()
      .then(existingBusiness => existingBusiness.attributes.category_id)
      .then(category_id => Business.forge({ id }).save({ category_id }))
      .catch((err) => {
        console.log(err);
      });
    });
  },
});
