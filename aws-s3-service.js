
/**
 * Require config.js
 * AWS S3 Service
 */

module.exports = function(config) {
  var AWS = require('aws-sdk');
  var S3 = new AWS.S3();
  var fs = require('fs');

  function formatS3Key(key) {
    return (key.substring(0, 2) + '/'
            + key.substring(2, 4) + '/'
            + key);
  };

  return {

    deleteFile : function(key, cb) {
      S3.deleteObject({ Bucket: config.aws.s3.BUCKET,
                        Key: config.aws.s3.ROOT_DIR + formatS3Key(key) }, cb);
    },

    saveFile : function (inputFilePath, s3FileKey, cb) {
      S3.upload({ Body: fs.createReadStream(inputFilePath),
                  Bucket: config.aws.s3.BUCKET,
                  Key: config.aws.s3.ROOT_DIR + formatS3Key(s3FileKey),
                  ACL: 'public-read' })
        .on('httpUploadProgress', function(evt) {
          // console.log('evt ' + evt);
        })
        .send(cb);
    },

    saveBuffer: function (buffer, s3FileKey, cb) {
      S3.upload({ Body: buffer,
                  Bucket: config.aws.s3.BUCKET,
                  Key: config.aws.s3.ROOT_DIR + formatS3Key(s3FileKey),
                  ACL: 'public-read' })
        .on('httpUploadProgress', function(evt) {
          // console.log('evt ' + evt);
        })
        .send(cb);
    }

  }
}
