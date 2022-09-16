const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const myDB = require('./server/database/db');
const routes = require('./server/routers/index');
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(routes);

const DB_SQL_PATH = path.join(__dirname, './db.sql');
const query = fs.readFileSync(DB_SQL_PATH, 'utf-8');

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
  myDB.exec(query);
})
