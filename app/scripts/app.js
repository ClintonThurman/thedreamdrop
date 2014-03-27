(function() {
    'use strict';

    angular.module('dreamDropApp', [
            'ngSanitize',
            'ngRoute',
            'LocalStorageModule',
            'ui.bootstrap'
        ])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/drop',
                    controller: 'DropCtrl'
                })
                .when('/recall', {
                    templateUrl: 'partials/recall',
                    controller: 'RecallCtrl'
                })
                .when('/login', {
                    templateUrl: 'partials/login',
                    controller: 'LoginCtrl'
                })
                .when('/about', {
                    templateUrl: 'partials/about',
                    controller: 'RecallCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        });
}());
