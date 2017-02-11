const express = require('express');
const plaid = require('plaid');

const routes = express.Router();

const plaidClient = new plaid.Client(process.env.PLAID_CLIENT_ID, process.env.PLAID_SECRET, plaid.environments.tartan);

routes.get('/users', () => {});
routes.post('/accounts', (req, res) => {
  plaidClient.exchangeToken(req.body.token, (exchangeErr, exchangeTokenRes) => {
    if (exchangeErr != null) {
      res.json(exchangeErr);
    } else {
      // - exchangeTokenRes.access_token (the Plaid access token - store somewhere persistent)
      // associate the access token with a specific user and use it to request all subsequent plaid api calls
      plaidClient.getConnectUser(exchangeTokenRes.access_token, (connectErr, connectRes) => {
        if (connectErr != null) {
          res.json(connectErr);
        } else {
          // return account data
          res.json(connectRes);
        }
      });
    }
  });
});

module.exports = routes;
