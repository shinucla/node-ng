var mongoose = require('mongoose');

var schema = mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
});

schema.methods.setter = function(key, val) { this[key] = val; return this; }

schema.methods.setName = function(val) { this.name = val; return this; }
schema.methods.setAge = function(val) { this.age = val; return this; }
schema.methods.setSex = function(val) { this.sex = val; return this; }


module.exports = schema;
