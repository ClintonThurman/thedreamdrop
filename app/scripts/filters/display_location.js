/* Filters */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .filter('displayLocation', function () {
            return function (location) {
                // allow google location non camelcase
                /*jshint camelcase: false */

                var locationDisplay = location.locality.long_name + ' ';
                locationDisplay += location.administrative_area_level_1.long_name + ' ';
                locationDisplay += location.country.long_name;

                return locationDisplay;
            };
        });
}());