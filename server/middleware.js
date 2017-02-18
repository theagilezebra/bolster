const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const unless = require('express-unless');

const helpers = require('./helpers');
const unprotectedPaths = ['/index.html', '/', '/api/users/signup', '/api/users/signin'];
helpers.checkUser.unless = require('express-unless');

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api', helpers.checkUser.unless({ path: unprotectedPaths }));
};
