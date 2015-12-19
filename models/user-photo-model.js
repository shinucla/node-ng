var mongoose = require('mongoose');

var schema = mongoose.Schema({
  userId           : { type: mongoose.Schema.Types.ObjectId},
  small            : { s3Key : String, s3Url : String },
  large            : { s3Key : String, s3Url : String },
  whenCreated      : Date,
  originalFileName : String,
  description      : String,
});

schema.methods.setUserId = function(val) { this.userId = val; return this; };
schema.methods.setSmall = function(key, url) { this.small.s3Key = key; this.small.s3Url = url; return this; };
schema.methods.setLarge = function(key, url) { this.large.s3Key = key; this.large.s3Url = url; return this; };
schema.methods.setWhenCreated = function(val) { this.whenCreated = val; return this; };
schema.methods.setOriginalName = function(val) { this.originalName = val; return this; };
schema.methods.setDescription = function(val) { this.description = val; return this; };

module.exports = schema;
