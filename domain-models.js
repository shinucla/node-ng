var mongoose = require('mongoose');

//            camel                          table                            snake
module.exports.Log          = mongoose.model('log',          require('./models/exception-model.js'));
module.exports.User         = mongoose.model('user',         require('./models/user-model.js'));
module.exports.UserProfile  = mongoose.model('user_profile', require('./models/user-profile-model.js'));

module.exports.Camera       = mongoose.model('camera',       require('./models/camera-model.js'));
module.exports.Skill        = mongoose.model('skill',        require('./models/skill-model.js'));
module.exports.Watch        = mongoose.model('watch',        require('./models/watch-model.js'));
module.exports.Product      = mongoose.model('product',      require('./models/product-model.js'));
