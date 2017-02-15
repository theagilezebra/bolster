require('dotenv').config({ path: `${__dirname}/../.env` });

const db = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.PG_USER,
    database: 'bolster',
  },
});

db.schema.createTableIfNotExists('addresses', (addresses) => {
  addresses.increments('id').primary();
  addresses.string('address', 50).unique().notNullable();
  addresses.string('city', 35);
  addresses.string('zip', 10);
  addresses.string('state', 35);
  addresses.string('country', 35);
  addresses.timestamps();
}).then((addresses) => {
  console.log('Created Table:', addresses);
  return db.schema.createTableIfNotExists('users', (users) => {
    users.increments('id').primary();
    users.string('accessToken', 128);
    users.string('firstName', 35).notNullable();
    users.string('lastName', 35).notNullable();
    users.string('email', 50).unique().notNullable();
    users.string('password', 128).notNullable();
    users.integer('address_id').unsigned();
    users.foreign('address_id').references('addresses.id');
    users.string('phone', 128);
    users.integer('bolsterIndex');
    users.timestamps();
  });
}).then((users) => {
  console.log('Created Table:', users);
  return db.schema.createTableIfNotExists('categories', (categories) => {
    categories.increments('id').primary();
    categories.string('name', 35).unique().notNullable();
    categories.timestamps();
  });
}).then((categories) => {
  console.log('Created Table:', categories);
  return db.schema.createTableIfNotExists('accounts', (accounts) => {
    accounts.increments('id').primary();
    accounts.string('institutionName', 35).notNullable();
    accounts.string('institutionType', 35).notNullable();
    accounts.string('name', 35);
    accounts.string('plaidAccountId', 50).unique();
    accounts.decimal('availableBalance');
    accounts.decimal('currentBalance');
    accounts.integer('user_id').unsigned();
    accounts.foreign('user_id').references('users.id');
    accounts.timestamps();
  });
}).then((accounts) => {
  console.log('Created Table:', accounts);
  return db.schema.createTableIfNotExists('businesses', (businesses) => {
    businesses.increments('id').primary();
    businesses.string('name', 50).notNullable();
    businesses.specificType('coordinates', 'POINT');
    businesses.integer('address_id').unsigned();
    businesses.foreign('address_id').references('addresses.id');
    businesses.string('category_id', 255);
    businesses.timestamps();
  });
}).then((businesses) => {
  console.log('Created Table:', businesses);
  return db.schema.createTableIfNotExists('budgets', (budgets) => {
    budgets.increments('id').primary();
    budgets.integer('category_id').unsigned();
    budgets.foreign('category_id').references('categories.id');
    budgets.dropForeign('category_id');
    budgets.integer('average');
    budgets.integer('goal');
    budgets.timestamps();
  });
}).then((budgets) => {
  console.log('Created Table:', budgets);
  return db.schema.createTableIfNotExists('goals', (goals) => {
    goals.increments('id').primary();
    goals.string('name', 63).notNullable();
    goals.integer('amount', 63).notNullable();
    goals.date('date').notNullable();
    goals.integer('user_id').unsigned();
    goals.foreign('user_id').references('users.id');
    goals.timestamps();
  });
}).then((goals) => {
  console.log('Created Table:', goals);
  return db.schema.createTableIfNotExists('achievements', (achievements) => {
    achievements.increments('id').primary();
    achievements.string('name', 63).notNullable();
    achievements.integer('user_id').unsigned();
    achievements.foreign('user_id').references('users.id');
    achievements.timestamps();
  });
}).then((achievements) => {
  console.log('Created Table:', achievements);
  return db.schema.createTableIfNotExists('transactions', (transactions) => {
    transactions.increments('id').primary();
    transactions.decimal('amount').notNullable();
    transactions.date('date').notNullable();
    transactions.integer('user_id').unsigned();
    transactions.foreign('user_id').references('users.id');
    transactions.integer('account_id');
    transactions.foreign('account_id').references('accounts.id');
    transactions.integer('business_id').unsigned();
    transactions.foreign('business_id').references('businesses.id');
    transactions.dropForeign('business_id');
    transactions.string('category_id', 50);
    // transactions.foreign('category_id').references('categories.id');
    transactions.timestamps();
  });
}).then((transactions) => {
  console.log('Created Table:', transactions);
}).catch((err) => {
  console.log(err);
});

module.exports = require('bookshelf')(db);
