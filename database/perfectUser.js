// create random date between two dates

function randomDate(start, end) {
  return new Date(start.getTime() + (Math.random() * (end.getTime() - start.getTime())));
}

const lol = randomDate(new Date(2012, 0, 1), new Date());
const lel = randomAmount();
console.log('random date', lol);
console.log('random amount', lel);

// create random amount between x and y

function randomAmount(lowRange, highRange) {
  return ((Math.random() * (highRange - lowRange)) + lowRange).toFixed(2);
}

// create random category given an array or categories
  // make this an array of objects
  // each category needs to be associated to an address and a name, which will constitute a business in our database

// dates and amounts added randomly every time
const purchaseTypes = {
  'Wine Bar': {
    category_id: '13001001',
    name: 'Nectar Wine Lounge',
    meta: {
      location: {
        address: '3330 Steiner St',
        city: 'San Francisco',
        state: 'CA',
      },
    },
  },
  'Food Truck': {
    category_id: '13005029',
    name: 'Senior Sisig',
    meta: {
      location: {
        address: '300 Pine St',
        city: 'San Francisco',
        state: 'CA',
      },
    },
  },
  'Movie Theatres': {
    category_id: '17001009',
    name: 'AMC Metreon 16',
    meta: {
      location: {
        address: '135 4th St #3000',
        city: 'San Francisco',
        state: 'CA',
      },
    },
  },
  Utilities: {
    category_id: '18068000',
    name: 'PG&E',
    meta: {
      location: {
        address: '77 Beale St',
        city: 'San Francisco',
        state: 'CA',
      },
    },
  },
  'Accessories Store': {
    category_id: '19012001',
    name: 'Nordstrom',
    meta: {
      location: {
        address: '865 Market St',
        city: 'San Francisco',
        state: 'CA',
      },
    },
  },
  'Food and Beverage Store': {
    category_id: '19025002',
    name: 'Whole Foods',
    meta: {
      location: {
        address: '2001 Market St',
        city: 'San Francisco',
        state: 'CA',
      },
    },
  },
  Taxi: {
    category_id: '22016000',
    name: 'Uber',
    meta: {
      location: {
        address: '1455 Market St #400',
        city: 'San Francisco',
        state: 'CA',
      },
    },
  },
};

console.log(purchaseTypes);

// set the date the user is created at (probably today)
// set purchases in the future

// a few possible scenarios:
  // script run whenever the user logs in. deletes that user's transactions, creates new ones based on the script.
  // run it when someone hits our site (even if they don't log in)
  // run it every few days. deletes that user's transactions and repopulates them
  // run it once and let it hang. Possible, but data will go stale.
