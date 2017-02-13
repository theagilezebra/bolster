const Category = require('../../database/models/category');

module.exports = {
  create: (req, res) => Category.forge(req.body).save().then((category) => {
    res.status(201).json(category);
  }).catch((err) => {
    res.status(400).json(err);
  }),

  get: (req, res) => Category.forge().where(req.query).fetchAll().then((items) => {
    res.json(items);
  }).catch((err) => {
    res.status(404).json(err);
  }),
};
