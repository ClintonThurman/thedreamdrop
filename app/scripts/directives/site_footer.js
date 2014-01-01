/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .directive('sitefooter', ['$location', function ($location) {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'partials/site_footer.html',
                replace: true
            };
        }]);
}());