const express = require('express');
const path = require('path');
const routes = require('./routes');
const middleware = require('./middleware');

const app = express();

app.listen(3000);

middleware(app, express);
app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../dist')));
