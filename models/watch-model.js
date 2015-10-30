//
// watch
//
var mongoose = require('mongoose');

var schema = mongoose.Schema({
   uid            : {type: mongoose.Schema.Types.ObjectId},
  name            : String
});

module.exports = schema;
