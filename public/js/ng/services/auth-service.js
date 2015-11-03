'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')

  .factory('AuthService', function($rootScope, $http, $q, $cookieStore, ServerService, $window) {
    var authService = {};

    authService.login = function(credential) {
      var defer = $q.defer();

      ServerService
        .exec('/user/api/login', credential)
        .then(function(result) {
          if (!!result && !!result.jwt) {
            defer.resolve(result.jwt);

          } else {
            defer.reject((!!result && !!result.errMsg
                          ? result.errMsg
                          : 'cannot login, please try again later'));
          }
        });

      return defer.promise;
    };

    authService.signup = function(profile) {
      var defer = $q.defer();

      ServerService
        .exec('/user/api/signup', profile)
        .then(function(result) {
          if (!!result && !!result.jwt) {
            defer.resolve(result.jwt);

          } else {
            defer.reject((!!result && !!result.errMsg
                          ? result.errMsg
                          : 'cannot login, please try again later'));
          }
        });

      return defer.promise;
    };

    authService.logout = function() {
      delete $window.localStorage['jwt'];
      $cookieStore.remove('user');
      delete $rootScope.user;
    };

    authService.saveJWT = function(jwt, callback) {
      $rootScope.jwt = jwt;

      try {
        $window.localStorage['jwt'] = jwt;
      } catch(e) {
        callback(e);
      }
    };

    authService.clearJWT = function() {
      delete $window.localStorage['jwt'];
    };

    authService.getJWT = function() {
      return $window.localStorage['jwt'] || $rootScope.jwt;
    };

    authService.getUser = function() {
      try {
        var jwt = $window.localStorage['jwt'] || $rootScope.jwt;

        if (!!jwt && 0 < jwt.indexOf('.')) {
          var base64Url = jwt.split('.')[1];
          var base64 = base64Url.replace('-', '+').replace('_', '/');

          return JSON.parse($window.atob(base64));
        }
      } catch (e) {
        try { delete $window.localStorage['jwt']; } catch(e) {}

        return null;
      }
    };

    return authService;
  })
;
