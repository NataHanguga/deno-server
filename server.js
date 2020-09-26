const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:ptaha2102@workers-hya0b.mongodb.net/test?retryWrites=true&w=majority", {
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

const app = require('./app');
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});
