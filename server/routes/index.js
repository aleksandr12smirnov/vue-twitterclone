const express = require('express');
const path = require('path');

const app = express();

// Routes

// Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
})

module.exports = app;