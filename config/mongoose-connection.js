const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/e-commerece')
  .then(() => console.log('Connected!'));
  

module.exports = mongoose.connection;