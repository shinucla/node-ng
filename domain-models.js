var mongoose = require('mongoose');

//            camel                          table                            snake
module.exports.Log            = mongoose.model('log',             require('./models/exception-model.js'));
module.exports.User           = mongoose.model('user',            require('./models/user-model.js'));
module.exports.UserCredential = mongoose.model('user_credential', require('./models/user-credential-model.js'));
module.exports.UserExtension  = mongoose.model('user_extension',  require('./models/user-extension-model.js'));

