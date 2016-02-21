//
// app.js
// @author Kevin Zhuang
// @version
// @since 04/17/2015
//

// MAIN ENTRY
//=======================================================================

var express       = require('express');
var http          = require('http');
var mongoose      = require('mongoose');
var flash         = require('connect-flash');

var favicon       = require('serve-favicon');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var google = require('googleapis');


// ================================================================
// Global Variables
// ================================================================
config            = require('./config.js');
NG_DIR            = __dirname + '/public/js/ng';
APP_ROOT_DIR      = __dirname + '/';
AwsS3Service      = require('./aws-s3-service.js')(config);

// CONFIG
//=======================================================================
var app = express();
http.createServer(app).listen(config.web.port);  //$sudo PORT=8080 node app.js
//https.createServer(options, app).listen(443);


app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public')); //js css img fonts...
app.use(cookieParser());
app.use(session( {secret: 'my_super_secrete_word', resave: true, saveUninitialized: true } ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
    callNextFunc('arg1', 'arg2');
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    callNextFunc(args[0], args[1]);
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    callNextFunc(args[0], args[1]);
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: ' + JSON.stringify(args));
    callNextFunc(args[0], args[1]);
  },
  function(args, callNextFunc) {
    console.log('series sync-ed function calls with args: '
                + args[0] + ', ' + args[1] );
  }
);



// Domain Models + Data Access Layer
//=======================================================================
Domain = require('./domain-models.js');
Logger = {log :
          function log(type, message) {
            var log = Domain.Log();
            log.type = type;
            log.message = message;
            log.save();
          }
         };

//mongoose.connect('192.168.2.10:27017/db', function(err) {
//mongoose.connect(config.mongodb.url, function(err) {
mongoose.connect(config.mongodb.url, 
		 { server: { keepAlive: 1,
			     socketOptions: { connectTimeoutMS: config.mongodb.dbTimeout },
			     poolSize: config.mongodb.dbPoolSize },
		   
		   replset: { keepAlive: 1,
			      socketOptions: { connectTimeoutMS: config.mongodb.dbTimeout },
			      poolSize: config.mongodb.dbPoolSize }
		 },
		 function(err) {
		     if (err) {
			 console.log('Cannot connect to mongodb');
			 process.exit(1);
		     }
		     
		     
		     
		     Domain.User.ensureAdminUserExists(config);
		     
		     require('./router.js')(app);
		     console.log('Server Started ...');
		     
		     //  var setter = (new Domain.TestSetter()
		     //                .setter('name', 'Kevin')
		     //                .setter('age', 12)
		     //                .setter('sex', 'male')
		     //                .save());
		     
		 });

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
	console.log('close mongo connection');
	process.exit(0);
    });
});

// When successfully connected
mongoose.connection.on('connected', function () {  
    console.log('db connected');
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
    console.log('db disconnected'); 
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
    console.log('db error: ' + err);
}); 