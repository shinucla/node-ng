'use strict';

// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')

  // Context Service
  .provider('ContextService', function() {
    var context = {};
    context.user = {firstname: 'Hello', lastname: 'World'};

    context.set = function(config) {
      context.user = {firstname: 'World', lastname: 'Hello'};
    };

    this.$get = function() {
      return context;
    };
  });
