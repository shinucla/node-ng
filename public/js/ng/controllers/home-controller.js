'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('homeController', function($scope,
                                         $location,
                                         ContextService,
                                         AuthService,
                                         ServerService) {

    $scope.logout = function() {
      AuthService.logout();
      $location.path('/user/login');
    };

    // Test getting data using ServerService.get
    ServerService
      .get('serverservice/product', { data: 'abc' })
      .then(function(products) {
        products.forEach(function(product) {
          console.log(product);
        });
      });

  });
