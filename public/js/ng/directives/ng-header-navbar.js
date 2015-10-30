angular.module('ngDemoApp')
  .directive('ngHeaderNavbar', function() {
    
    return {
      templateUrl: '/js/ng/views/ng-header-navbar.html',
      restrict: 'EA', // E = element, A = attribute, C = class, M = comment
      replace: true
    };

  });
