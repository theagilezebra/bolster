const routes = require('express').Router();

const users = require('./controllers/users');
const accounts = require('./controllers/accounts');
const categories = require('./controllers/categories');
const budgets = require('./controllers/budgets');
const transactions = require('./controllers/transactions');
const businesses = require('./controllers/businesses');
const goals = require('./controllers/goals');
const plaid = require('./controllers/plaid');
const achievements = require('./controllers/achievements');
const addresses = require('./controllers/addresses');

routes.post('/users/signup', users.signup);
routes.post('/users/signin', users.signin);
routes.put('/users/:id', users.update);
routes.get('/users/auth', users.checkAuth);
routes.delete('/users', users.delete);

// routes.post('/accounts/create', accounts.create); // --WE DO NOT USE THIS ENDPOINT---TODO: make this into '/accounts'. 'create' is implicit thanks to POST method
routes.get('/accounts', accounts.get);
routes.get('/accounts/:id', accounts.getOne); // ----NO NEED--- TODO: refactor this functionality into /accounts with query parameters

routes.post('/budgets', budgets.create); // --DONE--- TODO: make this into '/budgets'. 'create' is implicit thanks to POST method
routes.get('/budgets', budgets.get);

routes.post('/categories/create', categories.create); // TODO: make this into '/categories'. 'create' is implicit thanks to POST method
routes.get('/categories', categories.get);

routes.post('/goals', goals.create); // ----DONE---TODO: make this into '/goals'. 'create' is implicit thanks to POST method
routes.get('/goals', goals.get);
routes.put('/goals/:id', goals.update); // ----DONE----TODO: make this into '/goals/:id'. 'update' is implicit thanks to PUT method
routes.delete('/goals/:goal_id', goals.delete);

routes.get('/transactions', transactions.get);
routes.put('/transactions', transactions.update); // ----DONE---- TODO: make this into '/transactions'. 'update' is implicit thanks to PUT method

routes.get('/businesses', businesses.get);

routes.post('/plaid/link', plaid.connect.link);
routes.post('/plaid', plaid.connect.get);

routes.get('/achievements', achievements.get);

routes.post('/addresses', addresses.post);


module.exports = routes;
