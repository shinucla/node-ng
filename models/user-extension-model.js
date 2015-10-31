var mongoose = require('mongoose');

var schema = mongoose.Schema({
  user_id        : {type: mongoose.Schema.Types.ObjectId},
  birthday       : Date,
  interests      : String,
  avatar         : {mime: String, bin: Buffer}
});

module.exports = schema;
