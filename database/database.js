const db = require('knex')({
  client: 'pg',
  connection: {
    user: 'Anais',
    database: 'bolster',
  },
});

db.schema.hasTable('users').then((exists) => {
  if (!exists) {
    db.schema.createTable('users', (users) => {
      users.increments('id').primary();
      users.string('accessToken', 128);
      users.string('firstName', 35).notNullable();
      users.string('lastName', 35).notNullable();
      users.string('email', 50).notNullable();
      users.string('password', 128).notNullable();
      users.integer('address_id').unsigned();
      users.foreign('address_id').references('addresses.id');
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
      accounts.string('institutionName', 35).notNullable();
      accounts.string('institutionType', 35).notNullable();
      accounts.string('name', 35);
      accounts.integer('availableBalance');
      accounts.integer('currentBalance');
      accounts.integer('user_id').unsigned();
      accounts.foreign('user_id').references('users.id');
      accounts.timestamps();
    }).then((accounts) => {
      console.log('Created Table:', accounts);
    });
  }
});

db.schema.hasTable('transactions').then((exists) => {
  if (!exists) {
    db.schema.createTable('transactions', (transactions) => {
      transactions.increments('id').primary();
      transactions.integer('amount').notNullable();
      transactions.dateTime('date').notNullable();
      transactions.integer('user_id').unsigned();
      transactions.foreign('user_id').references('users.id');
      transactions.integer('account_id').unsigned();
      transactions.foreign('account_id').references('accounts.id');
      transactions.integer('business_id').unsigned();
      transactions.foreign('business_id').references('businesses.id');
      transactions.integer('category_id').unsigned();
      transactions.foreign('category_id').references('categories.id');
      transactions.timestamps();
    }).then((transactions) => {
      console.log('Created Table:', transactions);
    });
  }
});

db.schema.hasTable('businesses').then((exists) => {
  if (!exists) {
    db.schema.createTable('businesses', (businesses) => {
      businesses.increments('id').primary();
      businesses.string('name', 35).notNullable();
      businesses.specificType('coordinates', 'POINT');
      businesses.integer('address_id').unsigned();
      businesses.foreign('address_id').references('addresses.id');
      businesses.integer('category_id').unsigned();
      businesses.foreign('category_id').references('categories.id');
      businesses.timestamps();
    }).then((businesses) => {
      console.log('Created Table:', businesses);
    });
  }
});

db.schema.hasTable('addresses').then((exists) => {
  if (!exists) {
    db.schema.createTable('addresses', (addresses) => {
      addresses.increments('id').primary();
      addresses.string('address', 50);
      addresses.string('city', 35);
      addresses.string('ZIP', 10);
      addresses.string('state', 35);
      addresses.string('country', 35);
      addresses.timestamps();
    }).then((addresses) => {
      console.log('Created Table:', addresses);
    });
  }
});

db.schema.hasTable('budgets').then((exists) => {
  if (!exists) {
    db.schema.createTable('budgets', (budgets) => {
      budgets.increments('id').primary();
      budgets.integer('category_id').unsigned();
      budgets.foreign('category_id').references('categories.id');
      budgets.dropForeign('category_id');
      budgets.integer('average');
      budgets.integer('goal');
      budgets.timestamps();
    }).then((budgets) => {
      console.log('Created Table:', budgets);
    });
  }
});

db.schema.hasTable('goals').then((exists) => {
  if (!exists) {
    db.schema.createTable('goals', (goals) => {
      goals.increments('id').primary();
      goals.string('name', 63).notNullable();
      goals.integer('amount', 63).notNullable();
      goals.date('date').notNullable();
      goals.integer('user_id').unsigned();
      goals.foreign('user_id').references('users.id');
      goals.timestamps();
    }).then((goals) => {
      console.log('Created Table:', goals);
    });
  }
});

db.schema.hasTable('achievements').then((exists) => {
  if (!exists) {
    db.schema.createTable('achievements', (achievements) => {
      achievements.increments('id').primary();
      achievements.string('name', 63).notNullable();
      achievements.integer('user_id').unsigned();
      achievements.foreign('user_id').references('users.id');
      achievements.timestamps();
    }).then((achievements) => {
      console.log('Created Table:', achievements);
    });
  }
});

db.schema.hasTable('categories').then((exists) => {
  if (!exists) {
    db.schema.createTable('categories', (categories) => {
      categories.increments('id').primary();
      categories.string('name', 35).notNullable();
      categories.timestamps();
    }).then((categories) => {
      console.log('Created Table:', categories);
    });
  }
});

module.exports = require('bookshelf')(db);
