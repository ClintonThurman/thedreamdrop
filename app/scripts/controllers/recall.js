/* Controllers */
(function() {
    'use strict';

    /* jshint -W072 */
    angular.module('dreamDropApp')
        .controller('RecallCtrl', ['$scope', '$log', 'initService', 'localAjaxService',
            function ($scope, $log, initService, localAjaxService) {
                /* jshint +W072 */

                $scope.initialized = false;

                $scope.dreams = [];

                $scope.initData = {
                    tags: [],
                    categories: []
                };

                $scope.init = function () {
                    initService.getData().then(function (data) {
                        var i;

                        $scope.initData.tags = data.tags;
                        $scope.initData.categories = data.categories;

                        // Store tags by key
                        for (i = 0; i < $scope.initData.tags.length; i++) {
                            $scope.initData.tags[$scope.initData.tags[i].key] = $scope.initData.tags[i];
                        }

                        // Iterate over cats and and gather up the tags by key.
                        for(i =0 ; i < $scope.initData.categories.length; i++) {
                            $scope.initData.categories[i].tagObjs = [];
                            for (var k = 0; k < $scope.initData.categories[i].tags.length; k++){
                                $scope.initData.categories[i].tagObjs
                                    .push($scope.initData.tags[$scope.initData.categories[i].tags[k]]);
                            }
                        }

                        localAjaxService.getData({dreams:true}).then(function (data) {
                            $scope.dreams = data.dreams;
                            //console.log(data.dreams);

                            // Set the initialized flag
                            $scope.initialized = true;

                        });
                    });

                };

                $scope.init();
            }]);
}());