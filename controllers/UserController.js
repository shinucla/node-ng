//
// User Controller
//

module.exports = function(app) {

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

};