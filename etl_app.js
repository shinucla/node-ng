var config        = require('./config.js');
var mongoose      = require('mongoose');

Domain = require('./domain-models.js');

mongoose.connect(config.mongodb.url, function(err) {
  if (err) {
    console.log('Cannot connect to mongodb');
    process.exit(1);
  }
  console.log('Successfully connected to the mongodb');


  // --- Print out schema's fields
  for (var k in Domain.User.schema.paths) {
    console.log(k);
  }

  // --- schema static method using Promise.
  Domain
    .User
    .forEmail('new@new.com')
    .then(function(user) {
      console.log(user);
    });

});