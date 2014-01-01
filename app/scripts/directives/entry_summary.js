/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')

        .directive('entrysummary', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    entry: '=',
                    locale: '@',
                    action: '&'
                },
                link: function (scope) {

                    scope.isSubmitDisabled = function () {
                        var returnVal = true;

                        /*
                        if (scope.entry.dream.length > 1 && scope.entry.eTags.length > 0 && scope.entry.cTags.length > 0
                            && scope.entry.signature.length > 0) {
                            returnVal = false;
                        }
                        */
                        returnVal = false;

                        return returnVal;
                    };

                },
                templateUrl: 'partials/entrysummary.html',
                replace: true
            };
        });
}());