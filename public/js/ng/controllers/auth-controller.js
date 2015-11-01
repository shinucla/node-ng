'use strict';

// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')

  .controller('authController', function($rootScope, $scope, AuthService, ServerService, $location) {
    
    $scope.login = function(credential) {
      AuthService
        .login(credential)
        .then(function(jwt) { // defer.resolve
	  AuthService.saveJWT(jwt, function(err) {
	    alert('Your web browser does not support storing settings locally. '
		  + 'In Safari, the most common cause of  this is using "Private Browsing Mode"');
	  });
	  $rootScope.user = AuthService.getUser();
	  $location.path('#/home');

        }, function(errMsg) { // defer.reject
	  AuthService.clearJWT();
          credential.errMessage = errMsg;
        });
    };

    $scope.signup = function(userData) {
      AuthService
        .signup(userData)
        .then(function(jwt) { // defer.resolve
	  AuthService.saveJWT(jwt);
	  $rootScope.user = AuthService.getUser();
	  $location.path('#/home');

	}, function(errMsg) { // defer.reject
	  AuthService.clearJWT();
	});
    };

    $scope.getUserExtension = function() {
      ServerService
	.exec('/user/api/extension')
	.then(function(result) {
	  return result;
	});
    };

 });

// https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec


