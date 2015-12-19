'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')
  .controller('userExtensionController', function($rootScope, $scope, AuthService, ServerService, $location) {

    $scope.saveUserExtension = function() {
      ServerService
        .post('/user/api/extension', { userExtension: $scope.userExtension })
        .then(function(result) {
          AuthService.loadUserExtension(true);
          $location.path('#/home');
        });
    };

    $scope.uploadUserAvatarImage = function(file) {
      if (!file) {
        alert('please select an image of 250x200');

      } else if (500 * 1024 * 1024 < file.size) {
        alert('file size must not be over 500kB');

      } else {
        ServerService
          .uploadFile('/user/api/extension/avatar', { name: 'avatarImageFile', file: file })
          .then(function(result) {
            AuthService.loadUserExtension(true);
          });
      }
    };

  });