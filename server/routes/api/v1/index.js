const express = require('express');
const user = require('../../../api/v1/user');

const app = express();

// API Routes
app.use(user);


module.exports = app;