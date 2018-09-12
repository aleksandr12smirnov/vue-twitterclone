const express = require('express');
const path = require('path');
const apiRoute = require('./api');

const app = express();

// Routes
app.use(apiRoute);

// Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
});

module.exports = app;