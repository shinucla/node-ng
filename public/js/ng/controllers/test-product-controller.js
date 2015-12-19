'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('testProductController', function($scope,
                                                ContextService,
                                                SessionService,
                                                ServerService) {
    $scope.tagline = 'to be moon and back!';

    console.log(ContextService.user);
    ContextService.set(null);
    console.log(ContextService.user);
  });
