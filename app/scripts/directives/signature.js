/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')

        .directive('signature', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    entry: '='
                },
                templateUrl: 'partials/signature.html',
                replace: true
            };
        });
}());