'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('testLoginController', function($scope,
                                              $rootScope,
                                              ContextService,
                                              AUTH_EVENTS,
                                              AuthService) {

    $scope.doIt = function(testObj) {
      console.log(testObj);
    };

    $scope.login = function(credential) {
      credential.email = credential.username;

      console.log(credential);

      AuthService
        .login(credential)
        .then(function(user) {
          $rootScope.$broadcast(AUTH_EVENTS.LOGIN_SUCCESS);
          $scope.setUser(user);

        }, function() {
          $rootScope.$broadcast(AUTH_EVENTS.LOGIN_FAILED);
        });
    };

  });


// https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec
