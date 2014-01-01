/* Filters */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .filter('ellipsis', function () {
            return function (text, maxLength) {
                var oElement = angular.element('<div>' + text + '</div>'),
                    newText = oElement.text();

                if (newText.length > maxLength) {
                    oElement = angular.element('<div>' + newText.slice(0, maxLength) + '&#8230;</div>');
                }

                return oElement.text();
            };
        });
}());