const morgan = require('morgan');
const app = require('./server');

app.use(morgan('dev'));
