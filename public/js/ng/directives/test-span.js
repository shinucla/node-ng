// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .directive('testSpan', function($rootScope, ApiService) {
    // $scope only available for controllers and link function of directives
    // but $rootScope can be available for directives
    
    return {
      templateUrl: '/js/ng/views/test-span.html',
      restrict: 'EA',
      replace: true,
      link: function(Scope, element, attr) {
        // asdlfasdflajsd
      }
    };
  });
