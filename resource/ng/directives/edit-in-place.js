'use strict';

function objToKvPairs(record) {
  if ( !(record instanceof Object) ) {
    return record;

  } else {
    var result = [];

    for (var key in record) {
      var pairResult = objToKvPairs(record[key]);

      if (pairResult instanceof Array) {
        _.each(pairResult, function(entry) {
          result.push({key: key + '-' + entry.key, value: entry.value });
        });

      } else {
        result.push({key: key, value: pairResult});
      }
    }

    return result;
  }
}

angular.module('ngDemoApp')
  .directive('editInPlace', function () {
    return {
      restrict: 'E',
      replace: true, // important
      scope: {
        value: '=',
        commitFunc: '&' // passing function from parent controller to directive
      },
      template: ('<div>' +
                 '  <span ng-click="edit()" ng-bind="value"></span>' +
		 '  <input type="text" ng-model="value" ng-blur="commitChanges()" />' +
                 '</div>'),
      link: function ($scope, element, attrs) {
        var inputElement = angular.element(element.children()[1]);

        element.addClass('edit-in-place');
        $scope.editing = false;

        $scope.edit = function () {
          $scope.editing = true;
          element.addClass('active');
          inputElement[0].focus();
        };

        $scope.commitChanges = function() {
          element.removeClass('active');
          $scope.$eval($scope.submit);

          $scope.commitFunc();
        };
      }
    };
  })

  .directive('editInPlaceArea', function () {
    return {
      restrict: 'E',
      replace: true, // important
      scope: {
        value: '=',
        commitFunc: '&' // passing function from parent controller to directive
      },
      template: ('<div>' +
                 '  <span ng-click="edit()" ng-bind="value"></span>' +
                 '  <textarea ng-model="value" ng-blur="commitChanges()"></textarea>' +
                 '</div>'),
      link: function ($scope, element, attrs) {
        var inputElement = angular.element(element.children()[1]);

        element.addClass('edit-in-place-area');
        $scope.editing = false;

        $scope.edit = function () {
          $scope.editing = true;
          element.addClass('active');
          inputElement[0].focus();
        };

        $scope.commitChanges = function() {
          element.removeClass('active');
          $scope.$eval($scope.submit);

          $scope.commitFunc();
        };
      }
    };
  });

