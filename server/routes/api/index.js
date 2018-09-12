const express = require('express');
const v1 = require('./v1');

const app = express();

// API Routes
app.use(v1);

module.exports = app;