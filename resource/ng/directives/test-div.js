// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .directive('testDiv', function() {
    
    return {
      //template: '<div><h1>Hello World</h1></div>',
      templateUrl: '/ng/views/test-div.html',
      restrict: 'EA', // E = element, A = attribute, C = class, M = comment
      replace: true
    };

  });
