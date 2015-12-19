'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
angular.module('ngDemoApp')

  .controller('userPhotoController', function($rootScope, $scope, AuthService, ServerService, $location) {

    $scope.loadUserPhotos = function() {
      ServerService
        .get('/user/api/photo')
        .then(function(photos) {
          $scope.userPhotos = photos;
        });
    };

    $scope.uploadPhoto = function(file) {
      if (!file) {
        alert('please select an image.');

      } else if (1024 * 1024 * 1024 < file.size) {
        alert('file size must not be over 1 MB');

      } else {
        ServerService
          .uploadFile('/user/api/photo', {name: 'imageFile', file: file})
          .then(function(result) {
            $scope.loadUserPhotos();
          });
      }
    };

    $scope.deletePhoto = function(photo) {
      ServerService
        .deleteFile('/user/api/photo', { id: photo._id,
                                         keySmall: photo.small.s3Key,
                                         keyLarge: photo.large.s3Key })
        .then(function(result) {
          $scope.loadUserPhotos();
        });
    };


    $scope.loadUserPhotos();

  });

// http://plnkr.co/edit/DNq3NJj3x5SNvvx4xYv5?p=preview
// http://stackoverflow.com/questions/29328857/angularjs-load-image-to-img-tag-on-file-input

