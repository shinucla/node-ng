
// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .directive('ngProduct', function(ServerService) {

    function getProducts(scope) {
      ServerService
      .exec('/product/api/list')
      .then(function(docs) {
        scope.products = docs;
      });
    }

    function addToShoppingCart(id) {
      ServerService
        .exec('/product/api/shoppingcart', { id: id })
        .then(function(data) {
          // TBI
        });
    }
    
    return {
      templateUrl: '/ng/views/product.html',
      restrict: 'E', // E = element, A = attribute, C = class, M = comment
      replace: true,
      controller: function($scope, $attrs) {

	$scope.title = 'SHIT';
	$scope.addToShoppingCart = addToShoppingCart;

	getProducts($scope);

      }
    };
    
  });
