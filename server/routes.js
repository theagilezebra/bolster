const express = require('express');
const users = require('./controllers/users');
const morgan = require('morgan');

const routes = express.Router();

routes.post('/users/signup', users.createUser);
routes.post('/users/login', users.login);
routes.put('/users/update/:email', users.update);

module.exports = routes;
