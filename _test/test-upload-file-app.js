var express       = require('express');
var http          = require('http');

var multer        = require('multer');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

var config        = require('../config.js');

// CONFIG
//=======================================================================
var app = express();
http.createServer(app).listen(8080);  //$sudo PORT=8080 node app.js
//https.createServer(options, app).listen(443);

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public')); //js css img fonts...
app.use(cookieParser());
app.use(session( {secret: 'my_super_secrete_word', resave: true, saveUninitialized: true } ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(multer({ dest: './public/uploads/', 
//		 limits : { fileSize:100000 },
//		 rename: function (fieldname, filename) {
//		   var time = new Date().getTime();
//		   return filename.replace(/\W+/g, '-').toLowerCase() + time;
//		 },
//		 onFileUploadData: function (file, data, req, res) {
//		   // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
//		   var params = {
//		     Bucket: config.aws.s3.bucket,
//		     Key: file.name,
//		     Body: data,
//		     ACL: 'public-read'
//		   };
//		   
//		   console.log(file);
//		   
//		   //var s3 = new aws.S3()
//		   //s3.putObject(params, function (perr, pres) {
//		   //  if (perr) {
//		   //    console.log("Error uploading data: ", perr);
//		   //  } else {
//		   //    console.log("Successfully uploaded data", pres);
//		   //  }
//		   //});
//		 }
//	       })
//	.single('uploadFileName'));

//app.use(multer({ dest: __dirname + '/public/uploades/'}).single('why'));


function streamingToS3(fromFileName, toFileName) {
  var fs = require('fs');
  var body = fs.createReadStream(fromFileName);
  var AWS = require('aws-sdk');
  var s3obj = new AWS.S3({ params: { Bucket: config.aws.s3.BUCKET,
                                     Key: config.aws.s3.ROOT_DIR + toFileName,
                                     ACL: 'public-read'}});
  s3obj
    .upload({ Body: body })
    .on('httpUploadProgress', function(evt) {
      console.log('evt ' + evt);
    })
    .send(function(err, data) {
      if (err) {
        console.log(err);

      } else {
	console.log(data);
      }
    });
}


app
  .route('/upload')
  .post(multer({ dest: __dirname + '/public/uploades/' }).single('imageFile'), function(req, res) {
    if (req.file) {
      // streamingToS3(req.file.path, req.file.filename + req.file.originalname);
      require('fs').unlink(req.file.path);
      res.json(req.file);

    } else {
      res.json({err: 'no file specified'});
    }
  });


app
  .route('/uploadAsBase64')
  .post(multer({ dest: __dirname + '/public/uploades/' }).single('imageFile'), function(req, res) {
    if (req.file) {
      require('fs').readFile(req.file.path, function(err, data) {
	var buf = new Buffer(data);
	console.log('base64');
	// user.avatar.bin = buf.toString('base64');
	// user.avatar.mime = req.file.name;
	// user.save();
	
	res.json({base64: buf.toString('base64')});
      });

    } else {
      res.json({err: 'no file specified'});
    }
  });



app
  .route('/')
  .get(function(req, res) {
    //res.send('<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="imageFile"><input type="submit"></form>');
    res.send('<form action="http://rpi101.ddns.net/user/api/extension/avatar" method="post" enctype="multipart/form-data"><input type="file" name="avatarImageFile"><input type="submit"></form>');
  })

app
  .route('/angular')
  .get(function(req, res) {
    res.sendFile(__dirname + '/test-upload-file-app-angular.html');
  });

app
  .route('/base64')
  .get(function(req, res) {
    res.sendFile(__dirname + '/test-upload-file-app-base64.html');
  });

