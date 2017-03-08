const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
// const unless = require('express-unless');

const helpers = require('./helpers');
const populatePerfectUser = require('../database/sampleData/populatePerfectUser');

const unprotectedPaths = [
  '/',
  '/index.html',
  { url: '/api/categories', methods: ['GET'] },
  '/api/users/signup',
  '/api/users/signin',
];
helpers.checkUser.unless = require('express-unless');

module.exports = (app, express) => {
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') next();
    else if (req.get('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.headers.host + req.originalUrl}`);
    } else {
      next();
    }
  });
  app.use((req, res, next) => {
    if (req.url === '/') populatePerfectUser();
    next();
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api', helpers.checkUser.unless({ path: unprotectedPaths }));
};
