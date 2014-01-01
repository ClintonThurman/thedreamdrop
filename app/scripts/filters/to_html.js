/* Filters */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .filter('toHTML', function () {
            return function (text) {
                var oElement = angular.element('<div>' + text + '</div>');
                return oElement.text();
            };
        });
}());