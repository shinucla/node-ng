'use strict';

// To retrieve a reference to the same module for further
// configuration, call angular.module without the array argument.
var app = angular.module('ngDemoApp');

// ================================================================

app.controller('userPhotoController', function($rootScope, $scope, AuthService, ServerService, $location) {
  $scope.clonedPhoto = null;
  $scope.showAlbum = false;
  $scope.showUploadPreview = false;
  $scope.previewSrc = null;
  $scope.previewFile = null;

  $scope.loadUserPhotos = function() {
    ServerService
      .get('/user/api/photo')
      .then(function(photos) {
        $scope.userPhotos = photos;
        for (var i = 0; i < $scope.userPhotos.length; ++i) {
          $scope.userPhotos[i].index = i;
        }
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
          $scope.showUploadPreview = false;
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

  $scope.updatePhoto = function(photo) {
    var oriPhoto = $scope.userPhotos[photo.index];
    if (oriPhoto.description !== photo.description
        || oriPhoto.title !== photo.title) {
      ServerService.put('/user/api/photo', photo);
      $scope.userPhotos[photo.index] = photo;
    }
  };

  $scope.toggleAlbumModal = function(photo){
    $scope.showAlbum = !$scope.showAlbum;
    $scope.clonedPhoto = _.clone(photo);
  };

  $scope.showPrevPhoto = function(photo) {
    var i = photo.index - 1;
    $scope.clonedPhoto = _.clone(i < 0
                                 ? photo
                                 : $scope.userPhotos[i]);
  }

  $scope.showNextPhoto = function(photo) {
    var i = photo.index + 1;
    $scope.clonedPhoto = _.clone($scope.userPhotos.length <= i
                                 ? photo
                                 : $scope.userPhotos[i]);
  }

  $scope.toggleUploadPreviewModal = function(file){
    $scope.previewSrc = null;
    $scope.previewFile = file;

    var reader = new FileReader();

    reader.onload = function (e) {
      $scope.previewSrc = e.target.result;
    }

    reader.readAsDataURL(file);

    $scope.showUploadPreview = !$scope.showUploadPreview;
  };



  $scope.loadUserPhotos();

});

// ================================================================

app.directive('modal', function() {

  return { template: ('<div class="modal fade">' +
                      '  <div class="modal-dialog">' +
                      '    <div class="modal-content">' +
                      '      <div class="modal-header">' +
                      '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                      '        <h4 class="modal-title">{{ title }}</h4>' +
                      '      </div>' +
                      '      <div class="modal-body" ng-transclude></div>' +
                      '    </div>' +
                      '  </div>' +
                      '</div>'),
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

// ================================================================

app.directive('customOnChange', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);

      element.bind('change', function(){
        scope.$apply(function() {
          var file = element[0].files[0];
          onChangeFunc(file);
        });
      });
    }
  };
}]);

