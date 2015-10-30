'use strict';

// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('testProductController', function($scope, 
                                                ApiService, 
                                                ContextService, 
                                                SessionService,
                                                ServerService) {
    $scope.tagline = 'to be moon and back!';
    
    ApiService.get('api/product', function(products) {
      products.forEach(function(product) {
        console.log(product);
      });
    });

    //ServerService.exec('asdf', 'fff', 'ddd');
    
    console.log(ContextService.user);
    ContextService.set(null);
    console.log(ContextService.user);
  });
