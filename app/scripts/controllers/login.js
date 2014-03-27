/* Controllers */
(function() {
    'use strict';

    /* jshint -W072 */
    angular.module('dreamDropApp')
        .controller('LoginCtrl', ['$scope', '$log', 'initService', 'localAjaxService',
            function ($scope, $log, initService, localAjaxService) {
                /* jshint +W072 */

                $scope.initialized = false;

                $scope.initData = {
                };

                $scope.init = function () {
                };

                $scope.init();
            }]);
}());