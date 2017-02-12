const express = require('express');
const morgan = require('morgan');

const users = require('./controllers/users');
const accounts = require('./controllers/accounts');

const routes = express.Router();

routes.post('/users/signup', users.createUser);
routes.post('/users/login', users.login);
routes.put('/users/update/:email', users.update);

routes.post('/accounts/create', accounts.create);

module.exports = routes;
