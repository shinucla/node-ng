'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
var app = angular.module('ngDemoApp');

app.controller('userPhotoController', function($rootScope, $scope, AuthService, ServerService, $location) {

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


  // ================================================================
  $scope.zoomSize = 5;
  $scope.getWidth = function() {
    return document.getElementById('imageGallery').offsetWidth;
  };
  $scope.$watch($scope.getWidth, function(newValue, oldValue) {
    $scope.thumbWidth = newValue / (17 - ($scope.zoomSize * 2));
  });
  $scope.$watch('zoomSize', function(newValue) {
    $scope.thumbWidth = $scope.getWidth() / (17 - (newValue * 2));
  });
  window.onresize = function(){
    $scope.$apply();
  };
  $scope.query = '';
  $scope.orderProp = 'caption'
  // ================================================================





  $scope.loadUserPhotos();
  $scope.showModal = false;
  $scope.toggleModal = function(photo){
    $scope.showModal = !$scope.showModal;
    $scope.photo = photo;
  };

});

app.directive('modal', function() {

  return { template: '<div class="modal fade">' +
           '<div class="modal-dialog">' +
           '<div class="modal-content">' +
           '<div class="modal-header">' +
           '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
           '<h4 class="modal-title">{{ title }}</h4>' +
           '</div>' +
           '<div class="modal-body" ng-transclude></div>' +
           '</div>' +
           '</div>' +
           '</div>',
           restrict: 'E',
           transclude: true,
           replace:true,
           scope:true,
           link: function postLink(scope, element, attrs) {
             scope.title = attrs.title;

             scope.$watch(attrs.visible, function(value){
               if(value == true)
                 $(element).modal('show');
               else
                 $(element).modal('hide');
             });

             $(element).on('shown.bs.modal', function(){
               scope.$apply(function(){
                 scope.$parent[attrs.visible] = true;
               });
             });

             $(element).on('hidden.bs.modal', function(){
               scope.$apply(function(){
                 scope.$parent[attrs.visible] = false;
               });
             });
           }
         };
});


