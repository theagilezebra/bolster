const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.listen(3000);
app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

module.exports = app;
