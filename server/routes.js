const routes = require('express').Router();

const users = require('./controllers/users');
const accounts = require('./controllers/accounts');
const categories = require('./controllers/categories');
const budgets = require('./controllers/budgets');
const transactions = require('./controllers/transactions');
const businesses = require('./controllers/businesses');
const goals = require('./controllers/goals');

routes.post('/users/signup', users.create);
routes.post('/users/login', users.login);
routes.put('/users/update/:id', users.update);

routes.post('/accounts/create', accounts.create);
routes.get('/accounts', accounts.get);
routes.get('/accounts/:id', accounts.getOne);

routes.post('/budgets/create', budgets.create);
routes.get('/budgets', budgets.get);

routes.post('/categories/create', categories.create);
routes.get('/categories', categories.get);

routes.post('/goals/create', goals.create);
routes.get('/goals', goals.get);
routes.put('/goals/update/:id', goals.update);

routes.get('/transactions', transactions.get);

routes.get('/businesses', businesses.get);


module.exports = routes;
