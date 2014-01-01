/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')

        .directive('selectedtags', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    label: '@',
                    locale: '@',
                    tags: '='
                },
                link: function () {
                    /*
                    scope.setPrimaryTag = function (tag) {
                        for(var i=0; i<scope.tags.length; i++) {
                            scope.tags[i].primary = false;
                        }

                        tag.primary = true;

                    };

                    scope.$watch('tags.length', function () {
                        var bFoundPrimary = false;

                        for(var i=0; i<scope.tags.length; i++) {
                            if (scope.tags[i].primary === true) {
                                bFoundPrimary = true;
                                break;
                            }
                        }

                        if (scope.tags.length > 0 && !bFoundPrimary) {
                            scope.tags[0].primary=true;
                        }
                    });
                    */

                },
                templateUrl: 'partials/selectedtags.html',
                replace: true
            };
        });
}());