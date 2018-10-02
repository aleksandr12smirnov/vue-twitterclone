const express = require('express');
const user = require('../../../api/v1/User');
const auth = require('../../../api/v1/Auth');

const app = express();

// API Routes
app.use(user);
app.use(auth);


module.exports = app;