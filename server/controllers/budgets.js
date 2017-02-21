const Budget = require('../../database/models/budget');

module.exports = {
  create: (req, res) => Budget.forge(req.body).save().then((budget) => {
    res.status(201).json(budget);
  }).catch((err) => {
    res.status(400).json(err);
  }),

  get: (req, res) => Budget.forge().where(req.query).fetchAll().then((items) => {
    res.json(items);
  }).catch((err) => {
    res.status(404).json(err);
  }),
};
