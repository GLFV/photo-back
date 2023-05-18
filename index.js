const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const database = require('./db/conn');
const app = express();

app.use(bodyParser.json());

app.listen(3000, console.log('Server listing on port 3000'));

database.connection();

app.use(require('./router/auth.router'));
