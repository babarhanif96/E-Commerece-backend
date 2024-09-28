const mongoose = require('mongoose');
const config = require('config');
const debuger = require('debug')("development:mongoose");


mongoose.connect(`${config.get("Mongodb_connectionURI")}/ecommerece`)
  .then(() => debuger('Connected!'));
  

module.exports = mongoose.connection;