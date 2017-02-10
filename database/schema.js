const db = require('./connection');

db.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.schema.createTable('users', (users) => {
      users.increments('id').primary();
      users.string('accessToken', 128);
      users.string('firstName', 35);
      users.string('lastName', 35);
      users.string('email', 50);
      users.string('password', 128);
      users.string('address', 50);
      users.string('city', 35);
      users.string('ZIP', 10);
      users.string('state', 128);
      users.string('phone', 128);
      users.integer('bolsterIndex');
      users.timestamps();
    }).then((users) => {
      console.log('Created Table:', users);
    });
  }
});

db.schema.hasTable('accounts').then((exists) => {
  if (!exists) {
    db.schema.createTable('accounts', (accounts) => {
      accounts.increments('id').primary();
      accounts.string('institutionName', 35);
      accounts.string('institutionType', 35);
      accounts.string('name', 35);
      accounts.string('availableBalance', 35);
      accounts.integer('user_id').unsigned();
      accounts.foreign('user_id').references('users.id');
      accounts.timestamps();
    }).then((accounts) => {
      console.log('Created Table:', accounts);
    });
  }
});
