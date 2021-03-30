// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['angular', 'dropify'], factory);
  }
  else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    factory(root.angular, root.Dropify);
  }
}(this,
//EDIT: The dependencies are passed to this function
function (angular, Dropify) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------

  'use strict';

  return angular.module('ngDropify', [])
    .directive('ngDropify', function () {
      return {
        restrict: 'AE',
        template: '<input type="file" class="dropify" ngf-select ng-model="file" accept="image/*" ng-transclude />',
        transclude: true,
        replace: true,
        scope: {
          dropifyConfig: '=',
          eventHandlers: '=',
          file: '='
        },
        link: function(scope, element, attrs, ctrls) {
          try { Dropify }
          catch (error) {
            throw new Error('dropify.js not loaded.');
          }
          
            var dropify = new Dropify(element[0], scope.dropifyConfig);

            if (scope.eventHandlers) {
              Object.keys(scope.eventHandlers).forEach(function (eventName) {
                    dropify.on(eventName, scope.eventHandlers[eventName]);
              });
            }
            
            scope.dropify = dropify;
            scope.$watch('dropifyConfig.defaultFile', function() {
                if (scope.dropifyConfig.defaultFile !== undefined) {
                    if (scope.dropifyConfig.defaultFile !== '' && scope.dropifyConfig.defaultFile !== undefined) {
                        scope.dropify.resetPreview();
                        scope.dropify.setPreview(scope.dropifyConfig.defaultFile);
                    }
                }
            });
        }
      };
    });

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));
