
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
  }

  require('./controllers/HomeController')(app);
  require('./controllers/UserController')(app);
  require('./controllers/ProductController')(app);
  require('./controllers/ServerServiceController')(app);
}
