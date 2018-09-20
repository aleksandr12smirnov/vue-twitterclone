const express = require('express');

const app = express();

app.get('/api/user', (req, res) => {
  res.json({data: 'asdas'});
});

module.exports = app;