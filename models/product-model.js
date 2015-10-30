//
// product
//
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name            : String,
  price           : Number
});

module.exports = schema;
