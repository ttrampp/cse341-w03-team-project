require('dotenv').config();
//console.log('ENV TEST:', process.env.MONGODB_URI);

const express = require('express');
const bodyParser = require('body-parser');
//const mongodb = require('./db/connect');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

/*mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});*/

//Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { 
    console.log('Connected to MongoDB via Mongoose');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
  .catch((err) =>
    console.error('MongoDB connection error:', err));