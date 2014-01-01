/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')

        .directive('blockui', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    service: '='
                },
                templateUrl: 'partials/blockui.html',
                replace: true
            };
        });
}());