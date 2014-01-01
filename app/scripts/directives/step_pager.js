/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .directive('steppager', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    step: '='
                },
                link: function (scope) {

                    scope.next = function () {
                        if (scope.step.current < scope.step.last) {
                            scope.step.current++;
                        }
                    };

                    scope.previous = function () {
                        if (scope.step.current > 1) {
                            scope.step.current--;
                        }
                    };

                },
                templateUrl: 'partials/steppager.html',
                replace: true
            };
        });
}());