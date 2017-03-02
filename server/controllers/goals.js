const Goal = require('../../database/models/goal');

module.exports = {
  create: (req, res) => Goal.forge(req.body).save().then((goal) => {
    const { user_id } = req.body;
    res.status(201).json(goal);
  }).catch((err) => {
    res.status(400).json(err);
  }),

  get: (req, res) => Goal.forge().where(req.query).fetchAll().then((items) => {
    const { user_id } = req.query;
    res.json(items);
  }).catch((err) => {
    res.status(404).json(err);
  }),

  update: (req, res) => {
    const { user_id, goal_id } = req.query;
  },

  delete: (req, res) => Goal.forge().where({ id: req.body.goal_id }).destroy().then((destroyed) => {
    res.json({ goal_id: req.body.goal_id });
  }).catch((err) => {
    res.status(404).json(err);
  }),
};
