const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

const helpers = require('./helpers');

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(session({
    secret: 'lets make this an environment variable soon, ok?',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
