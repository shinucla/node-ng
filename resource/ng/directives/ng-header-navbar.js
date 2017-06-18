angular.module('ngDemoApp')
  .directive('ngHeaderNavbar', function() {
    
    return {
      templateUrl: '/ng/views/ng-header-navbar.html',
      restrict: 'EA', // E = element, A = attribute, C = class, M = comment
      replace: true
    };

  });
