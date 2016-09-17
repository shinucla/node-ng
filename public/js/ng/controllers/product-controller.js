'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('productController', function($scope,
                                            ContextService,
                                            SessionService,
                                            ServerService) {

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

    $scope.title = 'Hello World!!!';
    $scope.addToShoppingCart = addToShoppingCart;
    getProducts($scope);
    
  });
