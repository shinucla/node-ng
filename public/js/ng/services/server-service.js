'use strict';

// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.

angular.module('ngDemoApp')

/*
 * https://github.com/kriskowal/q
 * $q is a service in module ng
 * A service that helps you run functions asynchronously, 
 * and use their return values (or exceptions) when they 
 * are done processing.
 */
  .factory('ServerService', function($rootScope, 
                                     $window, 
                                     $http, 
                                     $q, 
                                     $cacheFactory, 
                                     $timeout, 
                                     $document, 
                                     ContextService) {
    var server = {};
   
    function exec(url, data, config) {
      return (config && config.cache
              ? execWithCache(url, data, config)
              : post(url, data, config));
    }

    function execWithCache(url, data, config) {
      var defer = $q.defer();
      // todo: xxx
    }

    function post(url, data, config, defer) {
      if (!angular.isDefined(defer)) {
        defer = $q.defer();
      }

      var req = {url: url,
                 data: data,
                 config: config || {},
                 defer: defer};

      $http
        .post(url, data)
        .success(function(response, status, headers, config) {
          switch (status) {
          case 200: req.defer.resolve(req.config.transformResponse
                                      ? req.config.transformResponse(response.result)
                                      : response.result);
            break;
            
          default: 
            console.log('error in responses');
            req.defer.reject('error');
          }
        })
        .error(function(response, status, headers, config) {
          console.log('error in posting request');
          req.defer.reject('error');
        })
      ;

      return defer.promise;
    }


    return {
      exec: function(url, data, config) {
        return exec(url, data, config);
      },

      resolve: function(url, config) { // so smart: ServerService.resolve('www.aa.com')({data: 'test'});
        return function(data) {
          return exec(url, data, config);
        };
      },

    };
  });
