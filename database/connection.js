const connection = require('knex')({
  client: 'connection',
  connection: {
    user: 'Anais',
    database: 'bolster',
  },
});

module.exports = connection;
