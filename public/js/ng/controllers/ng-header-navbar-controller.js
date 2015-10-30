'use strict';

// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('ngHeaderNavbarController', function($scope,
						   $rootScope,
						   ApiService, 
						   ContextService, 
						   AUTH_EVENTS,
						   AuthService) {

    $scope.goHome = function() {

    };

    $scope.login = function(username, password) {

    };

    $scope.signup = function(user) {

    };

    $scope.logoff = function() {

    };

 });


// https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec
