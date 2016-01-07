//
// Product Controller
//

module.exports = function(app) {
  app
    .route('/api/product')
    .get(function(req, res) {
      res.json({ status: 200,
                 result: null
               });
    })

    .post(function(req, res) {
      var product = req.body;
      res.json({ status: 200,
                 result: null
               });
    })

    .delete(function(req, res) {
      throw new Error('have not implemented yet');
    });

};
