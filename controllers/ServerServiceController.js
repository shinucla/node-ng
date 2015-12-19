//
// Product Controller
//

module.exports = function(app) {
  app
    .route('/serverservice/testexec')
    .post(function(req, res) {
      var data = req.body;
      res.json({ success : 'Updated Successfully',
                 status : 200,
                 result: { text: 'test exec success!!' } });

      //res.end(JSON.stringify(
      //  {success : 'Updated Successfully',
      //   status : 200,
      //   result: {text: 'test exec success!!'}
      //  }
      //));
    });

  app
    .route('/serverservice/product')
    .get(function(req, res) {

      // data can be passed into $http.get by
      // putting data in config as { params : data, config1: xx, config2: xx },
      // and retrieve at backend: req.query
      //
      // console.log(req.query);

      res.json({ success : 'get ok',
                 status : 200,
                 result: [{ name: 'product 1'},
                          { name: 'product 2'},
                          { name: 'product 3'}] });
    });

};
