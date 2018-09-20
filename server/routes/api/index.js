const express = require('express');
const v1 = require('./v1');

const app = express();

// API Routes
app.use(v1);


// API Route inaccessible or some URL error
app.use('/api/*', (req, res) => {
  res.json({
    data: 'Error on URL'
  });
});

module.exports = app;