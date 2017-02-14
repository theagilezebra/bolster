const Business = require('../../database/models/business');

module.exports = {
  get: (req, res) => Business.forge().where(req.query).fetchAll().then((items) => {
    res.json(items);
  }).catch((err) => {
    res.status(404).json(err);
  }),
};
