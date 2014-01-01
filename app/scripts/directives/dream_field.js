/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')

        .directive('dreamfield', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    entry: '=',
                    dream: '=',
                    initialized: '@'
                },
                link: function (scope) {
                    scope.maxLength = 250;

                    scope.remainingClass = function () {
                        var returnClass = '';

                        if (scope.dream.length) {
                            returnClass = 'badge-info';
                        }

                        if ((scope.maxLength - scope.dream.length) < 0) {
                            returnClass = 'badge-important';
                        }

                        return returnClass;
                    };

                    scope.enterKeyCallback = function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                    };

                    scope.$watch('dream', function () {
                        scope.entry = (scope.dream.length > scope.maxLength) ?
                            scope.dream.substr(0, scope.maxLength) : scope.dream;
                    });
                },
                templateUrl: 'partials/dreamfield.html',
                replace: true
            };
        });
}());