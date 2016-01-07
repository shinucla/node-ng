'use strict';

angular.module('ngDemoApp')

// should be used by ServerService (server-service.js) only
  .factory('ErrorHandleService', function($rootScope,
					  $window,
					  $route,
					  $cookieStore,
                                          $location) {
    var service = {};

    service.handleError = function(response) {
      switch (response.code) {
      case 'NOT_AUTHORIZED':
	delete $window.localStorage['jwt'];
	delete $rootScope.user;
	$cookieStore.remove('user');

	$route.reload();
	$location.path('/user/login');
	$location.replace();

        break;

      case 'HTTP_BAD_CODE':
        break;
      }
    };

    return service;
  })
;




/*

  backend: 
  1) make everything except ('/', '/home') rest api.
  2) use json
  3) response follow standards:
     response: 
     { result : <[{}, ...], {}, ...>,
       success : 'success message',
       error: 'error message',
       status : 201 }


  frontend:
    web:
     angular.js
       server-service 

    mobile:
     ios, android


*/