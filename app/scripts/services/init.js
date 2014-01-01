/* Services */
(function() {
    'use strict';

    /* jshint -W072 */
    angular.module('dreamDropApp')
        .service('initService', ['$http', '$q', '$log', 'localStorageService', 'localAjaxService', 'initDataService',
            function($http, $q, $log, localStorageService, localAjaxService, initDataService) {
                return {
                    getData: function() {
                        $log.debug('initService: getData');

                        //create our deferred object.
                        var deferred = $q.defer(),
                            nfo = localStorageService.get('nfo'),
                            jsonData = {},
                            isCallRequired = true,
                            oneDaysTime = 86400000,
                            isOnlyNfo = false,
                            currentDate = (new Date()).getTime(),
                            isDebug = false;

                        if (!nfo) {
                            $log.debug('no nfo... go get everthing');
                            jsonData = {nfo:true, tags:true, categories:true};
                            isCallRequired = true;
                        } else {
                            $log.debug('we already have nfo');
                            //$log.debug((currentDate - nfo.lastChecked) + ' > ' + oneDaysTime);
                            if ((currentDate - nfo.lastChecked) > oneDaysTime || isDebug) {
                                jsonData = {nfo:true};
                                isCallRequired = true;
                                isOnlyNfo = true;
                            } else {
                                isCallRequired = false;
                            }
                        }

                        if (isCallRequired){
                            localAjaxService.getData(jsonData).then(
                                function (data) {
                                    var key;
                                    $log.debug('init data returned:');
                                    $log.debug(data);

                                    if (isOnlyNfo && nfo && data.nfo) {
                                        var refreshJSON = {}, isRefreshRequired = false;

                                        data.nfo.lastChecked = currentDate;
                                        localStorageService.add('nfo', JSON.stringify(data.nfo));

                                        $log.debug('need to check collection dates');
                                        for (key in nfo.dataUpdates){
                                            if (nfo.dataUpdates.hasOwnProperty(key)) {
                                                if (data.nfo.dataUpdates[key] &&
                                                    data.nfo.dataUpdates[key] > nfo.dataUpdates[key]){
                                                    $log.debug(key + ': need new data');
                                                    refreshJSON[key] = true;
                                                    isRefreshRequired = true;
                                                }
                                            }
                                        }

                                        if (isRefreshRequired){
                                            localAjaxService.getData(refreshJSON).then(
                                                function (data) {
                                                    var key;

                                                    for (key in data){
                                                        if (data.hasOwnProperty(key) && data[key] != null) {
                                                            localStorageService.add(key, JSON.stringify(data[key]));

                                                        }
                                                    }

                                                    $log.debug('hitting resolve inner 1');
                                                    deferred.resolve(initDataService.getData());
                                                },
                                                function(err) {
                                                    $log.debug('localAjaxService.getData returned err: ' + err);
                                                    deferred.reject(err);
                                                }
                                            );
                                        } else {
                                            $log.debug('loading init data from local storage... inner');
                                            $log.debug('hitting resolve inner 2');
                                            deferred.resolve(initDataService.getData());
                                        }
                                    } else {
                                        for (key in data){
                                            if (data.hasOwnProperty(key) && data[key] != null) {
                                                if (key === 'nfo') {
                                                    data.nfo.lastChecked = currentDate;
                                                }

                                                localStorageService.add(key, JSON.stringify(data[key]));
                                            }
                                        }

                                        $log.debug('hitting resolve outter');
                                        deferred.resolve(initDataService.getData());
                                    }
                                },
                                function (err) {
                                    $log.debug('localAjaxService.getData returned err: ' + err);
                                    deferred.reject(err);
                                }
                            );
                        } else {
                            $log.debug('loading init data from local storage... outter');
                            deferred.resolve(initDataService.getData());
                        }

                        //return the promise that work will be done.
                        return deferred.promise;
                    }
                };
            }]);
}());