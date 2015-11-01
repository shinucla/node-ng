'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('homeController', function($scope,
					 $location,
                                         ApiService,
                                         ContextService,
                                         AuthService,
                                         ServerService) {
    
    $scope.logout = function() {
      AuthService.logout();
      $location.path('/user/login');
    };

    ApiService.get('api/product', function(products) {
      products.forEach(function(product) {
        console.log(product);
      });
    });

  });
