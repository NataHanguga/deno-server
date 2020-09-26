const mongoose = require('mongoose');
const app = require('./app.js');
require('dotenv').config();

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@workers-hya0b.mongodb.net/${process.env.DBASE}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
