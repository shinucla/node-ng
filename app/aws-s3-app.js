var config = require('./config.js');
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';

var s3 = new AWS.S3();

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
      // console.log('evt ' + evt);
    })
    .send(function(err, data) {
      if (err) {
        console.log(data);
      }
    });
}


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
s3.listObjects({Bucket: config.aws.s3.BUCKET}, function(err, data){
  data.Contents.forEach(function(obj) {
    console.log(obj.Key);
  });
});

// upload file to aws
if (false) {
  var fs = require('fs');
  var zlib = require('zlib');
  var body = fs.createReadStream('/tmp/car.jpg').pipe(zlib.createGzip());
  var s3obj = new AWS.S3({ params: { Bucket: config.aws.s3.BUCKET,
                                     Key: config.aws.s3.ROOT_DIR + 'avatars/new-car.zip',
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
      s3.putObject({ Bucket: config.aws.s3.BUCKET,
                     Key: config.aws.s3.ROOT_DIR + 'avatars/car.jpg',
                     Body: stream,
                     ACL: 'public-read' }, function (err) {
                       if (err) { throw err; }
                     });
    });
}

// delete folder / file
if (false) {
  s3
    .deleteObject({ Bucket: config.aws.s3.BUCKET, 
		    Key: config.aws.s3.ROOT_DIR + '7338b548578baed60e238da20bb44b21_small_car.jpg' }, 
		  function(err, data) {
		    if (err) { console.log(err); }
		  });
}


/**
   Here's one simple suggestion: compute the SHA-1 hash of the image, generate its hexadecimal form, and use the
   first two characters of the SHA-1 string as a first-level directory, the third and fourth characters as the second-level
   directory, and then place the file using the SHA-1 as the filename. SHA1 hashes give good distribution, even in the
   first few characters, so that will nicely distribute the files into a (relatively) balanced folder structure.

   This simplistic approach will use no more than 256 folders at each level, but will result in a total of 65K second-level
   folders used to store the files. In an optimal world, storing 1M files means that each of these 65K second-level folders
   only has to store about 15 files.

   Using the hexadecimal form of the image's SHA-1 has two very nice benefits: no name collisions, and any given file will
   only be stored once even if the same file is uploaded more than once.

   The big disadvantage of this approach is that it mixes all of the images from all users into a single bucket. That may
   or may not be important for your use case.
**/