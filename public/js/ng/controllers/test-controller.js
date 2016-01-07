'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('testController', function($rootScope,
					 $scope,
                                         ContextService,
                                         AuthService,
                                         ServerService) {

    var testUrl = '/home/api/testNotRequireLogin';

    if ($rootScope.user) {
      testUrl = '/home/api/testRequireLogin';
    }

    ServerService
      .exec(testUrl, {})
      .then(function(result) {

        console.log(result);

        $scope.testObj = result;
      });

    $scope.logout = function() {
      AuthService.logout();
    };

  });
