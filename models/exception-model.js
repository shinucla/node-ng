//
// Exception Logs
//
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  type            : String,
  message         : String
});

module.exports = schema;
