// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .directive('testNavbar', function() {
    
    return {
      //template: '<div><h1>Hello World</h1></div>',
      templateUrl: '/js/ng/views/test-navbar.html',
      restrict: 'EA', // E = element, A = attribute, C = class, M = comment
      replace: true
    };

  });
