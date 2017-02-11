const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const middleware = require('./middleware');
const morgan = require('morgan');

const app = express();

app.listen(3000);

middleware(app, express);
app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../dist')));
