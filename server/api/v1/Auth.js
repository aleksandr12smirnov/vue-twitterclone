const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

const {
        validateSignup,
        validateLogin
      } = require('../../middlewares/validators');

const app = express();
app.use(bodyParser.json());


// POST: Create a new user (signup)
app.post('/api/signup', validateSignup, (req, res) => {
  const body = req.body;

  const user = new User({
    email: body.email,
    username: body.username,
    password: bcrypt.hashSync(body.password, 10)
  });

  user.save((err, userdb) => {
    if (err) {
      return res.status(400).json({
        message: 'Error inserting into the database, the email or the username already exists',
        err
      });
    }

    res.json({
      message: 'Insertion complete',
      data: userdb
    });

  });

});

// POST: Login with an existing user
app.post('/api/login', validateLogin, (req, res) => {
  const body = req.body;

  User.findOne({ username: body.username, state: true })
  .exec( (err, user) => {

    if (user === null || !bcrypt.compareSync(body.password, user.password)) {
      return res.status(400).json({
        message: 'Login failed',
      });
    }

    res.json({
      message: 'Login correct',
      data: user
    })

  });

});

module.exports = app;