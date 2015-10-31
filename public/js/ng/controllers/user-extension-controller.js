'use strict';

// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')

  .controller('userExtensionController', function($rootScope, $scope, AuthService, ApiService, $location) {
    
    ApiService
      .get('/user/api/extension')
      .then(function(result) {
	console.log(result);
	$scope.userExtension = result;
      });
 });

// https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec


