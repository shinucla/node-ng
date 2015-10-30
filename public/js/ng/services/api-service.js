'use strict';

// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')

  // API Service
  // factory is not configurable service
  // in order to be able to inject into app.config, service need to be defined using provider
  .factory('ApiService', function($http) {
    
    return {
      get: function(url, callback) {
        $http.get(url)
          .success(function(data, status, headers, config) {
            callback(data);
          })
          .error(function(data, status, headers, config) {
            callback([]);
          });
      },
      
      create: function(url, data) {
        return $http.post(url, data);
      },
      
      delete: function(url, id) {
        return $http.delete(url + '/' + id);
      }
    };
    
  });
