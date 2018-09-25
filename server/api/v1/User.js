const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

const { validateSignup } = require('../../middlewares/validators');

const app = express();
app.use(bodyParser.json());


// POST - /api/signup
app.post('/api/signup', validateSignup ,(req, res) => {
  const body = req.body;

  const user = new User({
    email: body.email,
    username: body.username,
    password: bcrypt.hashSync(body.password, 10)
  });

  user.save((err, userdb) => {
    if (err) {
      return res.status(400).json({
        message: 'Error inserting into the database',
        err
      });
    }

    res.json({
      status: true,
      message: 'Insertion complete',
      data: userdb
    });

  });

});


module.exports = app;