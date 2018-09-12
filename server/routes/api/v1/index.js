const express = require('express');
const user = require('../../../api/v1/user');
const data = require('../../../api/v1/data');

const app = express();

// API Routes
app.use(user);
app.use(data);

// Si ingresan a una direccion api sin autorización o algo asi
// app.use('/api*', (req, res) => {
//   res.json({
//     res: 403
//   })
// })

module.exports = app;