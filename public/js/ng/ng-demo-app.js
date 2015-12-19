'use strict';

angular.module('ngDemoApp', ['ngCookies', 'ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider

      .when('/', {templateUrl: '/js/ng/views/home.html'})
      .when('/home', {templateUrl: '/js/ng/views/home.html'})
      .when('/home/about', {templateUrl: '/js/ng/views/home-about.html', controller: 'aboutController'})
      .when('/home/requireLogin', {templateUrl: '/js/ng/views/home-require-login.html', controller: 'testController'})
      .when('/home/notRequireLogin', {templateUrl: '/js/ng/views/home-not-require-login.html', controller: 'testController'})

      .when('/user/login', {templateUrl: '/js/ng/views/user-login.html', controller: 'authController'})
      .when('/user/signup', {templateUrl: '/js/ng/views/user-signup.html', controller: 'authController'})
      .when('/user/profile', {templateUrl: '/js/ng/views/user-extension.html', controller: 'userExtensionController'})
      .when('/user/profile/edit', {templateUrl: '/js/ng/views/user-extension-edit.html', controller: 'userExtensionController'})
      .when('/user/photo', {templateUrl: '/js/ng/views/user-photo.html', controller: 'userPhotoController'})

      .otherwise({redirectTo: '/'});
  }])

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$window','$location', '$rootScope', function($q, $window, $location, $rootScope) {
      
      return {
	'request' : function (config) {
	  config.headers = config.headers || {};
	  config.headers.jwt = $window.localStorage['jwt'] || $rootScope.jwt;

	  if (!config.headers.jwt 
	      && '/user/signup' !== $location.path()
	      && '/user/login' !== $location.path()) {
	    $location.path('/user/login');
	  }

	  return config;
	}
      };

    }]);
  }])

  .run(function(USER_ROLES,
                $rootScope,
                ServerService, 
		$window,
                $cookies,      // service in module ngCookies
		$cookieStore,  // service in module ngCookies
		AuthService ) {

    // loading the remembered user
    AuthService.loadUser();
    AuthService.loadUserExtension();

    //$rootScope.userRoles = USER_ROLES;
    //$rootScope.isAuthorized = AuthService.isAuthorized;

    // test loading cookies 'resp'
    var resp = $cookieStore.get('resp');
    if (resp) { console.log('yea!! loading from cookies, the value for resp = ' + resp); }
    
    // test
    ServerService
      .exec('/serverservice/testexec', {data: 'this is the data'})
      .then(function(response) {
        console.log('promise chaining 1 ' + response.text);
	$cookieStore.put('resp', response.text);
      })
      .then(function() {
        console.log('promise chaining 2');
      })
      .then(function() {
        console.log('promise chaining 3');
      })
    ;

    //console.log($cookies.get('_me'));
    //console.log(JSON.stringify($cookies));
  })
;
