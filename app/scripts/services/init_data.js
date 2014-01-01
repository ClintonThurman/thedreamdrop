/* Services */
(function() {
    'use strict';

    /* jshint -W072 */
    angular.module('dreamDropApp')
        .service('initDataService', ['$log', 'localStorageService', function($log, localStorageService){
            return {
                getData: function () {
                    var data = {};

                    data.nfo = localStorageService.get('nfo');
                    data.tags = localStorageService.get('tags');
                    data.categories = localStorageService.get('categories');

                    $log.debug('*************');
                    $log.debug(data);

                    return data;
                }
            };
        }]);
}());