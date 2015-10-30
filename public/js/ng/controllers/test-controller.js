'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('testController', function($scope,
                                         ApiService,
                                         ContextService,
                                         AuthService,
                                         ServerService) {
    
    ServerService
      .exec('/home/api/test', {})
      .then(function(result) {

	console.log(result);

        $scope.testObj = result;
      });

    $scope.logout = function() {
      AuthService.logout();
    };

    ApiService.get('api/product', function(products) {
      products.forEach(function(product) {
        console.log(product);
      });
    });

  });
