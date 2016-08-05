// To retrieve a reference to the same module for further 
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .directive('myElemDirective', function() {
    
    return {
      template: '<div><div>My Elem Directive</div><div my-attribute-directive="funcFromParentScope()">Click Me</div>',
      restrict: 'E', // E = element, A = attribute, C = class, M = comment
      replace: true,
      link: function(scope, element, attr, ctrl) {
	
	scope.funcFromParentScope = function() {
	  console.log('Hello I m from my-elem-directive');
	};
	
      } 
    };

  })

  .directive('myAttributeDirective', function($parse, $q) {

    return {
      restrict: 'A', // E = element, A = attribute, C = class, M = comment
      link: function(scope, element, attrs, ctrl) {
	element.on('click', function(event){
	  var fn = $parse(attrs.myAttributeDirective);

	  //scope.$apply(applyFn);
	  // or
	  fn(scope, { $event: event });

	  function applyFn(event) {
	    $q.when(fn(scope, { $event: event }))['finally'](function(){
	      console.log(event);
	    });
	  }
	  
	});
      }
    };

  })
;
