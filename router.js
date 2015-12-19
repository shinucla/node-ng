
/**
 * Register controllers here.
 */

module.exports = function(app) {

  app.apiRequiredLogin = function(req, res, next) {
    var token = req.headers.jwt;

    if (!!token) {
      Domain.User.verifyToken(token, function(err, user) {
        if (!err) {
          req.user = user;
          next();

        } else {
          res.end(JSON.stringify( {result: {err: 'not authorized'}} ));
        }
      });

    } else {
      res.end(JSON.stringify( {result: {err: 'not authorized'}} ));
    }
  };

  app.deleteS3File = function(key, cb) {
    var AWS = require('aws-sdk');
    new AWS.S3()
      .deleteObject({ Bucket: config.aws.s3.BUCKET, Key: config.aws.s3.ROOT_DIR + key }, cb);
  };

  app.streamingFileToS3 = function (fromFileName, toFileName, onSuccess, onError) {
    var fs = require('fs');
    var body = fs.createReadStream(fromFileName);
    var AWS = require('aws-sdk');
    var s3obj = new AWS.S3({ params: { Bucket: config.aws.s3.BUCKET,
                                       Key: config.aws.s3.ROOT_DIR + toFileName,
                                       ACL: 'public-read'}});
    s3obj
      .upload({ Body: body })
      .on('httpUploadProgress', function(evt) {
        // console.log('evt ' + evt);
      })
      .send(function(err, data) {
        if (err) {
          onError(err);

        } else {
          onSuccess(data);
        }
      });
  };

  app.streamBufferToS3 = function (bufferStream, toFileName, onSuccess, onError) {
    var buffer = new Buffer(0);

    bufferStream.on('data', function(d) {
      buffer = Buffer.concat([buffer, d]);
    });

    bufferStream.on('end', function() {
      var AWS = require('aws-sdk');
      var s3obj = new AWS.S3({ params: { Bucket: config.aws.s3.BUCKET,
                                         Key: config.aws.s3.ROOT_DIR + toFileName,
                                         ACL: 'public-read'}});
      s3obj
        .putObject({ Body: buffer })
        .on('httpUploadProgress', function(evt) {
          // console.log('evt ' + evt);
        })
        .send(function(err, data) {
          if (err) {
            console.log(err);
            if (onError) onError(err);

          } else {
            onSuccess(data);
          }
        });
    });
  };

  app.saveBufferToS3 = function (buffer, toFileName, cb) {
    var AWS = require('aws-sdk');
    var s3obj = new AWS.S3({ params: { Bucket: config.aws.s3.BUCKET,
                                       Key: config.aws.s3.ROOT_DIR + toFileName,
                                       ACL: 'public-read'}});
    s3obj
      .upload({ Body: buffer })
      .on('httpUploadProgress', function(evt) {
        // console.log('evt ' + evt);
      })
      .send(cb);
  };


  require('./controllers/HomeController')(app);
  require('./controllers/UserController')(app);
  require('./controllers/ProductController')(app);
  require('./controllers/ServerServiceController')(app);
}
