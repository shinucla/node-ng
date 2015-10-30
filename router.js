
/**
 * Register controllers here.
*/

module.exports = function(app) {
  
  app.apiRequiredLogin = function(req, res, next) {
    var token = req.headers.jwt;

    if (!!token) {
      Domain.User.verifyToken(token, function(err, user) {
	if (!err) {
	  console.log(user);
	  next();

	} else {
	  res.end(JSON.stringify( {result: {err: 'not authorized'}} ));
	}
      });
      
    } else {
      res.end(JSON.stringify( {result: {err: 'not authorized'}} ));
    }
  }

  require('./controllers/UserController')(app); 
  // MUST BE FIRST ONE for loading "remember me" middleware before rest of controller

  require('./controllers/HomeController')(app);
  require('./controllers/ProductController')(app);
  require('./controllers/ServerServiceController')(app);
  //require('./controllers/AjaxController')(app);
  
}
