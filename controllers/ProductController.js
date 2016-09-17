//
// Product Controller
//

module.exports = function(app) {
  app
    .route('/product/api/list')
    .post(function(req, res) {
      Domain.Product.find(function(err, docs){
	if (err) res.redirect('/error');

	res.json({ status: 200,
		   result: docs
		 });
      });
    });

  app
    .route('/product/api/shoppingcart')
    .post(function(req, res) {
      var input = req.body;

      var cart = new Domain.ShoppingCart(req.session.cart ? req.session.cart : {});
      var product = Domain.Product.findById(input.id, function(err, doc) {
	if (err) return res.redirect('/error');

	cart.add(doc, doc.id);
	req.session.cart = cart;
	console.log(req.session.cart);
	res.json({ status: 200,
		   result: {}
		 });
      });
    })

    .delete(function(req, res) {
      throw new Error('have not implemented yet');
    });
  
};
