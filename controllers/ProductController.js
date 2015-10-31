//
// Product Controller
//



module.exports = function(app) {
   app
    .route('/api/product')
    .get(function(req, res) {
      res.json([]);
    })
  
    .post(function(req, res) {
      var product = req.body;
      res.end(JSON.stringify(
        {success : 'Updated Successfully', status : 200}
      ));
    })

    .delete(function(req, res) {
      throw new Error('have not implemented yet');
    });

};
