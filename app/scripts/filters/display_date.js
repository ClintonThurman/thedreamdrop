/* Filters */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .filter('displayDate', function () {
            return function (text) {

                // padding function
                var d = new Date(text);
                var s = function(a,b) {
                    return(1e15+a+'').slice(-b);
                };

                // default date parameter
                if (typeof d === 'undefined'){
                    d = new Date();
                }

                // return ISO datetime
                return d.getFullYear() + '-' +
                    s(d.getMonth()+1,2) + '-' +
                    s(d.getDate(),2);
            };
        });
}());