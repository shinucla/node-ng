
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
    .route('/home/api/testRequireLogin')
    .post(app.apiRequiredLogin,
          function(req, res) {
            res.json({ status: 200,
                       result: { data1: [{ name: 'a' }, { name: 'b' }],
                                 data2: [{ age: 23 }, { age: 45 }]}
                     });
          });

  app
    .route('/home/api/testNotRequireLogin')
    .post(function(req, res) {
      res.json({ status: 200,
                 result: { data1: [{ name: 'a' }, { name: 'b' }],
                           data2: [{ age: 23 }, { age: 45 }]}
               });
    });


};
