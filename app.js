//
// app.js
// @author Kevin Zhuang
// @version
// @since 04/17/2015
//

// MAIN ENTRY
//=======================================================================

var google            = require('googleapis');

var express           = require('express');
var http              = require('http');
var mongoose          = require('mongoose');
var flash             = require('connect-flash');

var favicon           = require('serve-favicon');
var bodyParser        = require('body-parser');
var cookieParser      = require('cookie-parser');
var session           = require('express-session');
var MongoSessionStore = require('connect-mongo')(session);

// ================================================================
// Global Variables
// ================================================================
config            = require('./config.js');
NG_DIR            = __dirname + '/public/js/ng';
APP_ROOT_DIR      = __dirname + '/';
AwsS3Service      = require('./aws-s3-service.js')(config);
Logger            = { log :
                      function log(type, message) {
                        var log = Domain.Log();
                        log.type = type;
                        log.message = message;
                        log.save();
                      }
                    };


// Start the database connection
Domain = require('./domain-models.js'); // DAL
connectToDatabase();

var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public')); //js css img fonts...
app.use(cookieParser());
app.use(session({ secret: 'my_super_secrete_word',
                  resave: false,
                  saveUninitialized: false,
                  store: new MongoSessionStore({ mongooseConnection: mongoose.connection }),
                  cookie: { maxAge: 180 * 60 * 1000 }
                }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  // res.locals.login = req.isAuthenticated; // ------- for passing to view engine
  // res.locals.session = req.session; ---------------- for passing to view engine
  next();
});


http.createServer(app).listen(config.web.port);  // $sudo PORT=8080 node app.js
//https.createServer(options, app).listen(443);  // starts https server


// If the Node process ends, close the Mongoose connection
var really_want_to_exit = false;
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('close mongo connection');
    really_want_to_exit = true;
    process.exit(0);
  });
});

mongoose.connection.on('connected', function () { // When successfully connected
  console.log('db connected');
});

mongoose.connection.on('disconnected', function () { // When the connection is disconnected
  console.log('db disconnected');

  connection_count = 0;
  connectToDatabase();
});

mongoose.connection.on('error',function (err) { // If the connection throws an error
  console.log('db error: ' + err);
});

var connection_count = 0;
function connectToDatabase() {
  mongoose.connect(config.mongodb.url,
                   { server: { keepAlive: 1,
                               reconnectTries: Number.MAX_VALUE,
                               socketOptions: { connectTimeoutMS: config.mongodb.dbTimeout },
                               poolSize: config.mongodb.dbPoolSize },
                     replset: { keepAlive: 1,
                                socketOptions: { connectTimeoutMS: config.mongodb.dbTimeout },
                                poolSize: config.mongodb.dbPoolSize }
                   },
		   function(err) {
                     if (err) {
                       console.log('Cannot connect to mongodb');

                       if (connection_count < 50) {
                         reConnectToDatabase();

                       } else {
                         process.exit(1);
                       }
                     }

                     // post connection tasks:
                     Domain.User.ensureAdminUserExists(config);

                     require('./router.js')(app);
                     console.log('Server Started ...');

                     //  var setter = (new Domain.TestSetter()
                     //                .setter('name', 'Kevin')
                     //                .setter('age', 12)
                     //                .setter('sex', 'male')
                     //                .save());
                   });
}

function reConnectToDatabase() {
  console.log('trying to reconnect to db in 10 sec.');

  ++connection_count;
  setTimeout(connectToDatabase, 10000);
}

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
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    callNextFunc('arg1');
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    callNextFunc(args[0], 'new arg 2');
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    callNextFunc(args[0], args[1], 'new arg 3');
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    callNextFunc(args[0], args[1], args[2], 'new arg 4');
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: '
                + args[0] + ', ' + args[3] );
  }
);
