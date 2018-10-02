const express = require('express');
const bodyParser = require('body-parser');
const User = require('../../models/user.model');

const { validateEdit } = require('../../middlewares/validators');

const app = express();
app.use(bodyParser.json());


// GET: Get all users
app.get('/api/users', (req, res) => {
  // Query for all users with the state: true propertie
  User.find({ state: true })
  .exec( (err, users) => {

    if (err) {
      return res.status(400).json({
        message: 'Bad request',
        err
      });
    }

    // Query to know the total of users on the db
    User.countDocuments({ state: true }, (err, total) => {
      res.json({
        message: 'List of all users',
        data: {
          total,
          users
        }
      });

    });

  });

});

// GET: Get an specific user
app.get('/api/user/:username', (req, res) => {
  const username = req.params.username;

  User.findOne({ username, state: true })
  .exec( (err, user) => {
    
    if (user === null) {
      return res.status(400).json({
        message: 'No user on db',
      });
    }

    res.json({
      message: 'User info',
      data: user
    });

  });

});

// PUT: Edit a user
app.put('/api/user/:username', validateEdit, (req, res) => {
  const username = req.params.username;
  const body = req.body;

  User.findOneAndUpdate({ username, state: true }, body, { new: true }, (err, user) => {

    if (user === null) {
      return res.status(400).json({
        message: 'Invalid username',
      });
    } else if (err) {
      return res.status(400).json({
        message: 'The info is wrong',
        err
      });
    }

    res.json({
      message: 'Update complete',
      data: user
    });

  });

});

// DELETE: Delete a user by changing his state to false
app.delete('/api/user/:username', (req, res) => {
  const username = req.params.username;

  User.findOneAndUpdate({ username, state: true }, { state: false }, { new: true}, (err, user) => {

    if (user === null) {
      return res.status(400).json({
        message: 'Invalid username',
      });
    }

    res.json({
      message: 'User deleted',
      data: user
    });

  });

});


module.exports = app;