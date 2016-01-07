var config        = require('./config.js');

require('async').waterfall([
  function doit01(doit02) {
    console.log('func 1');
    doit02();
  },
  function doit02(doit03) {
    console.log('func 2');
    doit03();
  },
  function doit03(doit04) {
    console.log('func 3');
    doit04();
  }
], function(err) {
  console.log('err ' + err);
});








function series() {
  var callbacks = Array.prototype.slice.call(arguments);
  var args = {};

  function next() {
    var callback = callbacks.shift();
    if (callback) {
      callback(args, function() {
        args = arguments;
        next();
      });
    }
  }
  next();
}

series(
  function(args, next) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    next('123', '456', '789', 'abc');
  },
  function(args, next) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    next(args[3], args[2], args[1], args[0]);
  },
  function(args, next) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    next(args[0], args[2]);
  },
  function(args, next) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    next(args[1], args[0]);
  },
  function(args, next) {
    console.log('series sync-ed function calls with args: '
                + args[0] + ', ' + args[1] );
    next();
  }
);



