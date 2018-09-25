const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../../models/user.model');

const app = express();

app.use(bodyParser.json());

// Validation of inputs
const schema = Joi.object().keys({
  email: Joi.string().required(),
  username: Joi.string().regex(/(^[a-zA-Z0-9_]*$)/).min(8).max(20).required(),
  password: Joi.string().min(8).required()
});

// POST - /api/signup
app.post('/api/signup', (req, res) => {
  const body = req.body;

  // Check if the inputs are valid
  const validResult = Joi.validate(body, schema);
  
  if (validResult.error != null) {
    return res.status(400).json({
      message: 'The info is wrong'
    });
  }

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