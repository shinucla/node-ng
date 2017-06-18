var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: String,
  description: String,
  imagePath: String,
  price: Number
});

schema.methods.setter = function(key, val) { this[key] = val; return this; }

schema.methods.setTitle = function(val) { this.title = val; return this; }
schema.methods.setDescription = function(val) { this.description = val; return this; }
schema.methods.setImagePath = function(val) { this.imagePath = val; return this; }
schema.methods.setPrice = function(val) { this.price = val; return this; }

module.exports = schema;
