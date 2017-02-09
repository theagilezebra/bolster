const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

app.listen(3000);
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api', routes);

module.exports = app;
