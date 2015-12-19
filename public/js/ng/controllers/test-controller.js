'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('testController', function($scope,
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

  });
