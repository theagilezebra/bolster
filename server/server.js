const express = require('express');
const path = require('path');
const routes = require('./routes');
const middleware = require('./middleware');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port);

middleware(app, express);
app.use('/api', routes);
app.use(express.static(path.join(__dirname, '../dist')));
