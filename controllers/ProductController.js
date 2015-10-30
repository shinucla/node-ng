//
// Product Controller
//



module.exports = function(app) {
   app
    .route('/api/product')
    .get(function(req, res) {
      Domain.Product.find({}, function(err, docs){
        //if (err) throw err;
        res.json(docs);
      });
    })
  
    .post(function(req, res) {
      var product = req.body;
      Domain.Product.collection.insert(product, function(err, docs) {

        res.end(JSON.stringify(
          {success : 'Updated Successfully', status : 200}
        ));

      });
    })

    .delete(function(req, res) {
      throw new Error('have not implemented yet');
    });

};
