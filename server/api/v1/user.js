const express = require('express');

const app = express();

app.get('/api/user', (req, res) => {
  res.json({
    message: 'Si funciona!'
  })
});

module.exports = app;