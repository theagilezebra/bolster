const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');

const helpers = require('./helpers');

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(expressJWT({ secret: process.env.JWT_SECRET || 'super secret' }).unless({ path: ['/'] }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
