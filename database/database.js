const achievementList = require('../server/AchievementsService/achievementTypes'); // import achievements used to seed our database.

const connection = {
  client: 'pg',
  connection: process.env.PRODUCTION ? process.env.DATABASE_URL : { user: process.env.PG_USER, database: 'bolster' },
};

const db = require('knex')(connection);

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
    users.string('publicToken');
    users.string('accessToken');
    users.string('firstName', 35).notNullable();
    users.string('lastName', 35).notNullable();
    users.string('email', 50).unique().notNullable();
    users.string('password', 128).notNullable();
    users.integer('address_id').unsigned();
    users.foreign('address_id').references('addresses.id');
    // TODO: do not give users a default address, make this foreign key optional
    users.string('phone', 128);
    users.integer('bolsterIndex');
    users.timestamps();
  });
}).then((users) => {
  console.log('Created Table:', users);
  return db.schema.createTableIfNotExists('categories', (categories) => {
    categories.string('id').primary();
    categories.string('categories', 128).unique().notNullable();
    categories.timestamps();
  });
}).then((categories) => {
  console.log('Created Table:', categories);
  return db.schema.createTableIfNotExists('accounts', (accounts) => {
    accounts.increments('id').primary();
    accounts.string('institutionName', 35).notNullable();
    accounts.string('accountType', 35).notNullable();
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
    businesses.string('name').notNullable();
    businesses.specificType('coordinates', 'POINT');
    businesses.integer('address_id').unsigned();
    businesses.foreign('address_id').references('addresses.id');
    businesses.dropForeign('address_id');
    businesses.string('category_id');
    businesses.timestamps();
  });
}).then((businesses) => {
  console.log('Created Table:', businesses);
  return db.schema.createTableIfNotExists('budgets', (budgets) => {
    budgets.increments('id').primary();
    budgets.string('category_id').unsigned();
    budgets.foreign('category_id').references('categories.id');
    budgets.dropForeign('category_id');
    budgets.integer('average');
    budgets.integer('goal');
    budgets.integer('user_id').unsigned();
    budgets.foreign('user_id').references('users.id');
    budgets.timestamps();
  });
}).then((budgets) => {
  console.log('Created Table:', budgets);
  return db.schema.createTableIfNotExists('goals', (goals) => {
    goals.increments('id').primary();
    goals.string('name', 63).notNullable();
    goals.integer('amount', 63).notNullable();
    goals.date('startDate').notNullable();
    goals.date('endDate').notNullable();
    goals.integer('user_id').unsigned();
    goals.foreign('user_id').references('users.id');
    goals.timestamps();
  });
}).then((goals) => {
  console.log('Created Table:', goals);
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
    transactions.string('category_id');
    transactions.string('plaidTransactionId').unique();
    transactions.timestamps();
  });
}).then((transactions) => {
  console.log('Created Table:', transactions);
  return db.schema.createTableIfNotExists('achievementtypes', (achievementtypes) => {
    achievementtypes.increments('id').primary();
    achievementtypes.string('name').notNullable().unique();
    achievementtypes.string('structure');
    achievementtypes.string('description').notNullable();
    achievementtypes.timestamps();
  });
}).then((achievementtypes) => {
  console.log('Created Table:', achievementtypes);
  return db('achievementtypes').insert(achievementList);
}).then(achievementRecords => db.schema.createTableIfNotExists('achievements', (achievements) => {
  achievements.increments('id').primary();
  achievements.integer('user_id').unsigned();
  achievements.foreign('user_id').references('users.id');
  achievements.integer('achievementtypes_id').unsigned();
  achievements.foreign('achievementtypes_id').references('achievementtypes.id');
  achievements.date('date');
  achievements.integer('period'); // in days
  achievements.boolean('status'); // signifies either 'complete' or 'in progress'.
  achievements.integer('amount'); // could be an amount of money, or any unit to be reached for the achievement to complete.
  achievements.integer('bar'); // limit or minimum needed to validate the achievement.
  achievements.integer('percentage'); // percentage completion.
  achievements.decimal('total');
  achievements.decimal('average');
  achievements.timestamps();
})).then((achievements) => {
  console.log('Created Table:', achievements);
  require('../server/controllers/plaid').categories.get();
}).catch((err) => {
  const caughtError = 'alter table "addresses" add constraint "addresses_address_unique" unique ("address") - relation "addresses_address_unique" already exists';
  if (err.message === caughtError) return;
  console.log(err);
});

module.exports = require('bookshelf')(db);
