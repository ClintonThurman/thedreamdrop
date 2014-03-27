/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .directive('siteheader', ['$location', function ($location) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                },
                link: function (scope) {

                    scope.featurelink = {};

                    switch ($location.path()) {
                        case '':
                        case '/':
                        case '/drop':
                            scope.featurelink = {
                                text: 'drop'
                            };
                            break;
                        case '/recall':
                            scope.featurelink = {
                                text: 'recall'
                            };
                            break;
                        case '/login':
                            scope.featurelink = {
                                text: 'login'
                            };
                            break;
                        case '/about':
                            scope.featurelink = {
                                text: 'about'
                            };
                            break;
                    }
                },
                templateUrl: 'partials/site_header.html',
                replace: true
            };
        }]);
}());