/* Services */
(function() {
    'use strict';

    /* jshint -W072 */
    angular.module('dreamDropApp')
        .service('localAjaxService', ['$http', '$q', '$log', function ($http, $q, $log) {
            return {
                getData: function (jsonData) {
                    $log.debug('localAjaxService: getData');
                    $log.debug(jsonData);

                    //create our deferred object.
                    var deferred = $q.defer();


                    //make the call.
                    $http({
                        method: 'GET',
                        url: '/api/getdata?r=' + parseInt(Math.random() * 100000000),
                        headers: {'Content-Type': 'application/json'},
                        params: {
                            'r':parseInt(Math.random() * 100000000),
                            'type':encodeURIComponent(JSON.stringify(jsonData))
                        },
                        cache: false
                    }).success(function (data, status, headers) {
                        // when data is returned resolve the deferment.
                        // but only resolve data with an 'application/json' content-type
                        if (headers('content-type') !== undefined &&
                            headers('content-type').indexOf('application/json') !== -1) {
                            deferred.resolve(data);
                        } else {
                            deferred.reject();
                        }
                    }).error(function () {
                            //or reject it if there's a problem.
                            deferred.reject();
                        });

                    //return the promise that work will be done.
                    return deferred.promise;
                },

                postData: function (jsonData) {
                    //create our deferred object.
                    var deferred = $q.defer();

                    //make the call.
                    $http({
                        method: 'POST',
                        url: '/api/postdata',
                        headers: {'Content-Type': 'application/json'},
                        data: JSON.stringify(jsonData),
                        cache: false
                    }).success(function (data, status, headers) {
                            // when data is returned resolve the deferment.
                            // but only resolve data with an 'application/json' content-type
                            if (headers('content-type') !== undefined &&
                                headers('content-type').indexOf('application/json') !== -1) {
                                deferred.resolve(data);
                            } else {
                                deferred.reject();
                            }
                        }).error(function () {
                            //or reject it if there's a problem.
                            deferred.reject();
                        });

                    //return the promise that work will be done.
                    return deferred.promise;
                },

                getLocationData: function (scope) {
                    //create our deferred object.
                    var deferred = $q.defer();
                    var genericErrorCode = 2;

                    if (navigator !== undefined && navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            var latitude = position.coords.latitude,
                                longitude = position.coords.longitude,
                                requestURL;

                            requestURL = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
                            requestURL += latitude;
                            requestURL += ',';
                            requestURL += longitude;
                            requestURL += '&sensor=false';

                            $http.get(requestURL).success(function (data, status, headers) {
                                // when data is returned resolve the deferment.
                                // but only resolve data with an 'application/json' content-type
                                if (headers('content-type') !== undefined &&
                                    headers('content-type').indexOf('application/json') !== -1) {
                                    var location = data.results[0],
                                        componentKey = 'address_components',
                                        longNameKey = 'long_name',
                                        shortNameKey = 'short_name',
                                        components = location[componentKey],
                                        genericLocation = {};
                                    for (var i = 0; i < components.length; i++) {
                                        var types = components[i].types;
                                        for (var k = 0; k < types.length; k++) {
                                            var type;
                                            switch (types[k]) {
                                                case 'locality':
                                                case 'administrative_area_level_2':
                                                case 'administrative_area_level_1':
                                                case 'country':
                                                case 'postal_code':
                                                    type = types[k];
                                                    break;
                                            }

                                            if (type !== undefined) {
                                                genericLocation[type] = {};
                                                genericLocation[type][longNameKey] = components[i][longNameKey];
                                                genericLocation[type][shortNameKey] = components[i][shortNameKey];
                                            }
                                        }
                                    }

                                    deferred.resolve(genericLocation);
                                } else {
                                    // Someone is trying to pass us something other than JSON,
                                    // and it's probably not google api
                                    deferred.reject();
                                }

                            }).error(function () {
                                    // There was a problem talking to the google api to get
                                    // city, state, country... maybe it's down?
                                    deferred.reject(genericErrorCode);
                                });

                        }, function (err) {
                            // code: 1 user said no, 2 position unavailable, 3 timeout
                            scope.$apply(function () {
    //                            console.log(err)
                                deferred.reject(err.code);
                            });
                        }, { maximumAge: 600000, timeout: 10000 });

                    } else {
                        // We encountered an error trying to use 'navigator.geolocation'
                        // maybe it's not supported by their browser?
                        scope.$apply(function () {
                            deferred.reject(genericErrorCode);
                        });
                    }

                    //return the promise that work will be done.
                    return deferred.promise;

                } // end getLocationData

            }; // end localAjaxService
        }]);
}());