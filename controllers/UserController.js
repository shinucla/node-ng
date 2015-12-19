//
// User Controller
//

module.exports = function(app) {
  var fs = require('fs');
  var gm = require('gm');

  /* Login */
  app
    .route('/user/api/login')
    .post(function(req, res) {
      var jsonUser  = { 'email': req.body.email,
                        'password': req.body.password };
      Domain.User.loginUser(jsonUser, function(errMsg, jwt) {

        res.end(JSON.stringify(
          { success : 'Updated Successfully',
            status : 201,
            result: { jwt: jwt, errMsg: errMsg }
          }
        ));
      });
    });

  /* Signup */
  app
    .route('/user/api/signup')
    .post(function(req, res) {
      var jsonUser  = { 'firstname': req.body.firstname,
                        'lastname': req.body.lastname,
                        'email': req.body.email,
                        'password': req.body.password };
      Domain.User.signupUser(jsonUser, function(errMsg, jwt) {

        res.end(JSON.stringify(
          { success : 'Updated Successfully',
            status : 201,
            result: { jwt: jwt, errMsg: errMsg }
          }
        ));
      });
    });

  /* get user extension */
  app
    .route('/user/api/extension')
    .get(app.apiRequiredLogin,
         function(req, res) {
           Domain.UserExtension.findOne({ userId: req.user._id }, function(err, extension) {
             if (null === extension) {
               new Domain.UserExtension()
                 .setUserId(req.user._id)
                 .save(function(err) {
                   res.json({ result: { userId: req.user._id } });
                 });

             } else {
               res.json({ result: extension });
             }
           });
         })

    .post(app.apiRequiredLogin,
          function(req, res) {
            var json = req.body.userExtension;

            Domain.UserExtension.update({ userId: req.user._id }, json, function(err, num) {
              res.json({ result: json });
            });
          });

  app
    .route('/user/api/extension/avatar')
    .post(app.apiRequiredLogin,
          require('multer')({ dest: APP_ROOT_DIR + 'public/uploads/' }).single('avatarImageFile'),
          function(req, res) {
            if (!req.file) return res.json({ result: 'file is empty' });

            gm(req.file.path) // 96 x 96
              .noProfile()
              .resize(96, 96)
              .gravity('Center')
              .extent(96, 96)
              .background('#ffffff')
              .toBuffer('jpg', function(err, bufLarge) {

                gm(bufLarge) // 32 x 32
                  .resize(32, 32)
                  .toBuffer('jpg', function(err, bufSmall) {

                    fs.unlink(req.file.path);

                    Domain.UserExtension.update({ userId: req.user._id },
                                                { small32x32: bufSmall.toString('base64'),
                                                  medium96x96: bufLarge.toString('base64') },
                                                function(err, num) {
                                                  res.json({ result: num,
                                                             success : 'Updated Successfully',
                                                             status : 200 });

                                                });
                  });
              });
          });

  app
    .route('/user/api/photo')
    .get(app.apiRequiredLogin,
         function(req, res) {
           Domain.UserPhoto.find({ userId: req.user._id }, function(err, docs) {
             res.json({ result: docs });
           });
         })

    .post(app.apiRequiredLogin,
          require('multer')({ dest: APP_ROOT_DIR + 'public/uploads/' }).single('imageFile'),
          function(req, res) {
            var keySmall = req.file.filename + '_small_' + req.file.originalname;
            var keyLarge = req.file.filename + '_large_' + req.file.originalname;

            gm(req.file.path)
              .noProfile()
              .toBuffer(function(err, bufLarge) {

                gm(bufLarge)
                  .resize(96, 96)
                  .gravity('Center')
                  .extent(96, 96)
                  .background('#ffffff')
                  .toBuffer(function(err, bufSmall) {

                    AwsS3Service.saveBuffer(bufSmall, keySmall, function(err1, resultSmall) {

                      AwsS3Service.saveBuffer(bufLarge, keyLarge, function(err2, resultLarge) {

                        fs.unlink(req.file.path);

                        new Domain.UserPhoto()
                          .setUserId(req.user._id)
                          .setSmall(keySmall, resultSmall.Location)
                          .setLarge(keyLarge, resultLarge.Location)
                          .setWhenCreated(new Date())
                          .setOriginalName(req.file.originalname)
                          .setDescription(req.file.originalname)
                          .save(function(err) {

                            res.json({ result: 'good' });

                          });
                      });
                    });
                  });
              });
          })

    .delete(app.apiRequiredLogin,
            function(req, res) {
              var keySmall = req.query.keySmall;
              var keyLarge = req.query.keyLarge;
              var id = req.query.id;

              AwsS3Service.deleteFile(keySmall, function(err, data) {

                AwsS3Service.deleteFile(keyLarge, function(err, data) {

                  Domain.UserPhoto
                    .remove({ _id: id }, function(err, num) {

                      res.json({ result: err });

                    });
                });
              });
            });
};
