
// Home Controller

var routeToHome = function(req, res){
  var ip = req.connection.remoteAddress;
  res.sendFile(NG_DIR + '/views/index.html');
};

module.exports = function(app) {
  app
    .route('/')
    .get(routeToHome);

  app
    .route('/home')
    .get(routeToHome);


  app
    .route('/home/api/test')
    .post(app.apiRequiredLogin,
          function(req, res) {
            res.end(JSON.stringify(
	      {result: 
               {data1: [{name: 'a'}, {name: 'b'}],
		data2: [{age: 23}, {age: 45}]}
	      }));
          });
};
