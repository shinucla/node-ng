//
// User Controller
//

module.exports = function(app) {

  /* Login */
  app
    .route('/user/api/login')
    .post(function(req, res) {
      var jsonUser  = {'email': req.body.email,
                       'password': req.body.password};
      Domain.User.loginUser(jsonUser, function(errMsg, jwt) {

        res.end(JSON.stringify(
          {success : 'Updated Successfully',
           status : 201,
           result: {jwt: jwt, errMsg: errMsg}
          }
        ));
      });
    });

  /* Signup */
  app
    .route('/user/api/signup')
    .post(function(req, res) {
      var jsonUser  = {'firstname': req.body.firstname,
                       'lastname': req.body.lastname,
                       'email': req.body.email,
                       'password': req.body.password};
      Domain.User.signupUser(jsonUser, function(errMsg, jwt) {

        res.end(JSON.stringify(
          {success : 'Updated Successfully',
           status : 201,
           result: {jwt: jwt, errMsg: errMsg}
          }
        ));
      });
    });

  /* get user extension */
  app
    .route('/user/api/extension')
    .get(app.apiRequiredLogin,
         function(req, res) {
           Domain.UserExtension.findOne({user_id: req.user._id}, function(err, extension) {
             if (null === extension) {
               extension = new Domain.UserExtension();
	       extension.user_id = req.user._id;
	       extension.save(function() {
                 res.json({result: extension});
               });
             } else {
               res.json({result: extension});
             }
           });
         })

  /*
    .post(app.apirequiredlogin,
    function(req, res) {
    var json = req.body.extension;

    Domain.UserExtension.findOne({user_id : req.user._id}, function(err, extension) {
    extension.interests = json.interests;
    extension.save();
    });
    })
  */
  ;

};
