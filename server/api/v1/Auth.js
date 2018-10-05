const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const {
        validateSignup,
        validateLogin,
      } = require('../../middlewares/validators');
const { checkToken } = require('../../middlewares/auth');

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
      const msg = 'Error inserting into the database, the email or the username already exists';
      return handleError(res, 400, msg);
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

    if (err || user === null || !bcrypt.compareSync(body.password, user.password)) {
      return handleError(res, 400, 'Login failed');
    }

    // This is the payload to create the jwt
    const payload = {
      _id: user._id,
      username: user.username,
      state: user.state
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    // const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1m' });

    res.json({
      message: 'Login correct',
      data: user,
      jwt: token
    });

  });

});

// GET: Check if there's a token on local storage
app.get('/api/auth', checkToken, (req, res) => {
  res.json({ user: req.user })
});


module.exports = app;