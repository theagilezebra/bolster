const express = require('express');
const morgan = require('morgan');
// const plaid = require('plaid');
// const plaidClient = new plaid.Client(process.env.PLAID_CLIENT_ID, process.env.PLAID_SECRET, plaid.environments.tartan);

const users = require('./controllers/users');
const accounts = require('./controllers/accounts');

const routes = express.Router();

routes.post('/users/signup', users.create);
routes.post('/users/login', users.login);
routes.put('/users/update/:email', users.update);

routes.post('/accounts/create', accounts.create);
// routes.post('/accounts', (req, res) => {
//   plaidClient.exchangeToken(req.body.token, (exchangeErr, exchangeTokenRes) => {
//     if (exchangeErr != null) {
//       res.json(exchangeErr);
//     } else {
//       // - exchangeTokenRes.access_token (the Plaid access token - store somewhere persistent)
//       // associate the access token with a specific user and use it to request all subsequent plaid api calls
//       plaidClient.getConnectUser(exchangeTokenRes.access_token, (connectErr, connectRes) => {
//         if (connectErr != null) {
//           res.json(connectErr);
//         } else {
//           // return account data
//           res.json(connectRes);
//         }
//       });
//     }
//   });
// });

module.exports = routes;
