var mongoose = require('mongoose');
var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';

var schema = mongoose.Schema({
  user_id        : {type: mongoose.Schema.Types.ObjectId},
  birthday       : Date,
  interests      : String,
  //avatar       : {mime: String, bin: Buffer}
  avatar         : String
});

// ================================================================

function createBucket(name) {
  new AWS.S3({params: {Bucket: name}}).createBucket(function() {
    // done;
  });
}

function uploadFileToS3(bucket, path, file) {
  var fs = require('fs');
  var zlib = require('zlib');

  var body = fs.createReadStream('bigfile').pipe(zlib.createGzip());
  var s3obj = new AWS.S3({params: {Bucket: bucket, Key: 'myKey'}});
  s3obj.upload({Body: body}).
    on('httpUploadProgress', function(evt) { console.log(evt); }).
    send(function(err, data) { console.log(err, data) });
}





module.exports = schema;
