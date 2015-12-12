var config = require('./config.js');
var AWS = require('aws-sdk');

AWS.config.region = 'us-west-2';
process.env.AWS_ACCESS_KEY_ID = config.aws.s3.ACCESS_KEY_ID;
process.env.AWS_SECRET_ACCESS_KEY = config.aws.s3.SECRET_ACCESS_KEY;

var s3 = new AWS.S3();

// list buckets
s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});

// list folders in buckets
s3.listObjects({Bucket: 'shared-oregon'}, function(err, data){
  data.Contents.forEach(function(obj) {
    console.log(obj.Key);
  });
});

// upload file to aws
if (false) {
  var fs = require('fs');
  var zlib = require('zlib');
  var body = fs.createReadStream('/tmp/car.jpg').pipe(zlib.createGzip());
  var s3obj = new AWS.S3({ params: { Bucket: 'shared-oregon',
                                     Key: 'project-seek/avatars/new-car.zip',
                                     ACL: 'public-read'}});
  s3obj
    .upload({ Body: body })
    .on('httpUploadProgress', function(evt) {
      console.log('evt ' + evt);
    })
    .send(function(err, data) {
      if (err) {
        console.log(data);
      }
    });
}

// another method to update a file to s3
if (false) {
  var stream = require('fs')
    .createReadStream('/tmp/car.jpg');

  stream
    .on('error', function(err) {
      if (err) { throw err; }
    })
    .on('open', function(err, data) {
      s3.putObject({ Bucket: 'shared-oregon',
		     Key: 'project-seek/avatars/car.jpg',
		     Body: stream,
		     ACL: 'public-read' }, function (err) {
		       if (err) { throw err; }
		     });
    });
}

// delete folder / file
if (false) {
  s3.deleteObject({ Bucket: 'shared-oregon', Key: 'project-seek/avatars/car.jpg' }, function(err, data) {
    if (err) { console.log(err); }
  });
}