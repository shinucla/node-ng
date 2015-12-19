
angular.module('ngDemoApp')
  .directive('fileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
          scope.$apply(function(){
            var file = element[0].files[0];

            // var reader = new FileReader();
            // reader.onload = function() {
            //   scope.$apply(function(){
            //     scope.file = file;
            //     scope.imageUrl = reader.result;
            //     console.log(reader.result);
            //   });
            // };
            // reader.readAsDataURL(file);

            modelSetter(scope, file);

          });
        });
      }
    };
  }]);