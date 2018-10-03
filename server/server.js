require('./../config/');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const volleyball = require('volleyball');

const app = express();

// error handle function
handleError = (res, code, message) => {
  res.status(code || 500).json({ message });
}

// dist folder index
app.use(express.static(__dirname + '/../dist'));

// Volleyball middleware
app.use(volleyball);

// Cors
app.use(cors());

// Routes config
app.use(routes);


// Connections
mongoose.connect(process.env.DB, { useNewUrlParser: true })
.then( () => {
  
  const server = app.listen(process.env.PORT, () => {
    const port = server.address().port;
    console.log('App now running on port:', port);
  });

})
.catch( err => console.log('\n There is no connection with the database: \n\n', err ));