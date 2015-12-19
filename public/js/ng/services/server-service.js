'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
//
// ================================================================
//
// https://github.com/kriskowal/q
// $q is a service in module ng
// A service that helps you run functions asynchronously,
// and use their return values (or exceptions) when they
// are done processing.
//
// ================================================================
//
// Responses from backend are assumpted to have this format:
//    { result: ....... }
//
// ================================================================
//
// $http.get(url,    [config]).then(successCallBack, errCallBack);
// $http.delete(url, [config]).then(successCallBack, errCallBack);
// $http.head(url,   [config]).then(successCallBack, errCallBack);
// $http.jsonp(url,  [config]).then(successCallBack, errCallBack);
//
// $http.post(url,   data, [config]).then(successCallBack, errCallBack);
// $http.put(url,    data, [config]).then(successCallBack, errCallBack);
// $http.patch(url,  data, [config]).then(successCallBack, errCallBack);
//
// ================================================================
//
// To pass data in get, delete, head, jsonp, just extend the config to include 'params':
//
// _.extend({ params: data }, config) ==> { params: data, config1: ..., config2: ... }
//

angular.module('ngDemoApp')
  .factory('ServerService', function($rootScope,
                                     $window,
                                     $http,
                                     $q,
                                     $cacheFactory,
                                     $timeout,
                                     $document) {
    var server = {};

    function promiseByStatus(response, status, defer) {
      switch (status) {
      case 200: 
	defer.resolve(response.result);
        break;

      default: 
        defer.reject('error');
      }
    }

    // ================================================================

    server.get = function(url, query, config, defer) {
      if (!angular.isDefined(defer)) {
        defer = $q.defer();
      }

      $http
        .get(url, _.extend({ params: query }, config))
        .success(function(response, status, headers, config) {
          promiseByStatus(response, status, defer);
        })
        .error(function(response, status, headers, config) {
          defer.reject('error');
        });

      return defer.promise;
    };

    // ================================================================

    server.post = function(url, data, config, defer) {
      if (!angular.isDefined(defer)) {
        defer = $q.defer();
      }

      var req = { url: url,
                  data: data,
                  config: config || {},
                  defer: defer};

      $http
        .post(url, data, config)
        .success(function(response, status, headers, config) {
          switch (status) {
          case 200:
            req.defer.resolve(req.config.transformResponse
                              ? req.config.transformResponse(response.result)
                              : response.result);
            break;

          default:
            req.defer.reject('error');
          }
        })
        .error(function(response, status, headers, config) {
          req.defer.reject('error');
        });

      return req.defer.promise;
    };

    // ================================================================

    server.delete = function(url, query, config, defer) {
      if (!angular.isDefined(defer)) {
        defer = $q.defer();
      }

      $http
        .delete(url, _.extend({ params: query }, config))
        .success(function(response, status, headers, config) {
          promiseByStatus(response, status, defer);
        })
        .error(function(response, status, headers, config) {
          req.defer.reject('error');
        });

      return defer.promise;
    };

    // ================================================================

    server.execWithCache = function(url, data, config) {
      var defer = $q.defer();
      // todo: xxx
    };

    // ================================================================

    server.exec = function(url, data, config) {
      return (config && config.cache
              ? server.execWithCache(url, data, config)
              : server.post(url, data, config));
    };

    // ================================================================

    server.resolve = function(url, config) { // so smart: ServerService.resolve('www.aa.com')({data: 'test'});
      return function(data) {
        return exec(url, data, config);
      };
    };

    // ================================================================

    server.uploadFile = function(url, fileEntry, defer) {
      var fd = new FormData();
      fd.append(fileEntry.name, fileEntry.file);

      var config = { transformRequest: angular.identity,
                     headers: {'Content-Type': undefined }};

      return server.post(url, fd, config, defer)
    };

    // ================================================================

    server.deleteFile = function(url, fileParams, defer) {
      return server.delete(url, fileParams, null, defer);
    };

    // ================================================================

    return server;

  });