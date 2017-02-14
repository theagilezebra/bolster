const Transaction = require('../../database/models/transaction');

module.exports = {
  get: (req, res) => Transaction.forge().where(req.query).fetchAll().then((items) => {
    res.json(items);
  }).catch((err) => {
    res.status(404).json(err);
  }),
};
