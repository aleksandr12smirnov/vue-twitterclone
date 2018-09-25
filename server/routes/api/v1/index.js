const express = require('express');
const user = require('../../../api/v1/User');

const app = express();

// API Routes
app.use(user);


module.exports = app;