var mongoose = require('mongoose');

var schema = mongoose.Schema({
  userId         : { type: mongoose.Schema.Types.ObjectId },
  birthday       : Date,
  interests      : String,
  small32x32     : String, //Buffer,
  medium96x96    : String, //Buffer
});

schema.methods.setUserId = function(val) { this.userId = val; return this; };
schema.methods.setBirthday = function(val) { this.birthday = val; return this; };
schema.methods.setInterests = function(val) { this.interests = val; return this; };
schema.methods.setSmall32x32 = function(val) { this.small32x32 = val; return this; };
schema.methods.setMedium96x96 = function(val) { this.medium96x96 = val; return this; };

module.exports = schema;
