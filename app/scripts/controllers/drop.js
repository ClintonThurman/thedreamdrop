/* Controllers */
(function() {
    'use strict';

    /* jshint -W072 */
    angular.module('dreamDropApp')
        .controller('DropCtrl', ['$scope', '$timeout', '$log', 'initService', 'localAjaxService',
            function ($scope, $timeout, $log, initService, localAjaxService) {
                /* jshint +W072 */

                $scope.initialized = false;
                $scope.appConstants = {};
                $scope.alerts = []; //{error || success && msg}:
                $scope.entryStarted = false;
                $scope.entrySubmitted = false;
                $scope.tagTemplate = '';

                // todo: need to find a better way to pass around locale,
                // it's currently passed to each directive individually
                $scope.locale = 'en_US';

                $scope.entryStep = {
                    current: 1,
                    last: 4
                };

                $scope.entry = {
                    dream: '',
                    selectedTags: {},
                    signature: '',
                    location: {}
                };

                $scope.initData = {
                    dream: '',
                    tags: [],
                    categories: []
                };

                $scope.init = function () {

                    $log.debug('init...');

                    initService.getData().then(function (data) {
                        var i;

                        $scope.tagTemplate = $scope.buildTagTemplate(data.categories);
                        $scope.entry.selectedTags = JSON.parse($scope.tagTemplate);
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

                        // Set the initialized flag
                        $scope.initialized = true;

                    });


                    localAjaxService.getLocationData($scope).then(
                        function (locationData) {
                            $scope.entry.location = locationData;
                        },
                        function (err) {
                            switch (err) {
                                case 1:
                                    $scope.alerts.push({ type: 'error', msg: 'Location data is required' +
                                        ' to post a dream. Please allow your browser to provide this.' +
                                        ' Don\'t worry, we don\'t gather or save street level data, just' +
                                        ' broader stuff like city, state and country.' });
                                    break;
                                case 2:
                                case 3:
                                    // todo: add a message for the safari wired network issue.
                                    $scope.alerts.push({ type: 'error', msg: 'Location data is required to post a' +
                                        ' dream. Unfortunately we weren\'t able to determine your location. Please' +
                                        ' try again, or wait and try again later.' });
                                    break;
                            }
                        }
                    );

                };

                $scope.buildTagTemplate = function (categories) {
                    var i, catLength, tagTemplate = '{';

                    for (i = 0, catLength = categories.length; i < catLength; i = i + 1) {
                        tagTemplate += ('"' + categories[i].key  + '"');
                        tagTemplate += ':[]';
                        if (i < categories.length - 1) {
                            tagTemplate += ', ';
                        }
                    }
                    tagTemplate += '}';

                    return tagTemplate;
                };

                $scope.clearEntry = function () {
                    $scope.entryStarted = false;
                    $scope.entrySubmitted = false;
                    $scope.entryStep.current = 1;
                    $scope.initData.dream = '';
                    $scope.entry.dream = '';
                    $scope.entry.eTags = [];
                    $scope.entry.cTags = [];
                    $scope.clearSelectedTags($scope.initData.categories);
                };

                $scope.clearSelectedTags = function (categories) {
                    var i, categoriesLength;
                    for (i = 0, categoriesLength = categories.length; i < categoriesLength; i = i + 1) {
                        var tags = categories[i].tagObjs, k, tagsLength;

                        for (k = 0, tagsLength = tags.length; k < tagsLength; k = k + 1) {
                            var tag = tags[k];
                            tag.selected = false;
                        }
                    }
                };

                $scope.checkEntryStatus = function () {

                    //|| $scope.entry.eTags.length > 0 || $scope.entry.cTags.length > 0
                    if (($scope.entry.dream.length > 0) && !$scope.entrySubmitted) {
                        $scope.entryStarted = true;
                    }

                    if ($scope.entrySubmitted) {
                        $scope.entryStarted = false;
                    }

                    return $scope.entryStarted;
                };

                $scope.postEntry = function () {
                    // Todo: only allow the post if we've got all the data, location data included....

                    localAjaxService.postData($scope.getCleanEntryForPost()).then(function () {
                        // Display a success message
                        $scope.alerts.push({ type: 'success', msg: 'Well done! You successfully added a dream.' });

                        // Set the entrySubmitted so the dropfade animation can start
                        $scope.entrySubmitted = true;

                        // Wait to clear the entry until the dropfade animation is done
                        // $timeout(function () {
                        // }, 2000);
                        $scope.clearEntry();
                        $('html, body').animate({ scrollTop: 0 }, 'slow');

                        // Clear out any success messages after a certain amount of time
                        $timeout(function () {
                            for (var i = 0; i < $scope.alerts.length; i = i + 1) {
                                if ($scope.alerts[i].type === 'success') {
                                    $scope.closeAlert(i);
                                }
                            }
                        }, 6000);

                    }, function () {
                        // Display an error message
                        $scope.alerts.push({ type: 'error', msg: 'Oops, something went wrong.' });
                    });
                };

                $scope.getCleanEntryForPost = function () {
                    var cleanEntry = {}, i;
                    cleanEntry.dream = $scope.entry.dream;
                    cleanEntry.signature = $scope.entry.signature;
                    cleanEntry.location = $scope.entry.location;

                    // init the selectedTags object
                    cleanEntry.selectedTags = JSON.parse($scope.tagTemplate);

                    // loop through selectedTags object and grab each tag's key,
                    // so we can store only they key in the cleanEntry
                    for (var key in $scope.entry.selectedTags) {
                        if ($scope.entry.selectedTags.hasOwnProperty(key)) {
                            var tagArray = $scope.entry.selectedTags[key], cleanArray = [], tagArrayLength;

                            // loop through the tags for this 'category'
                            for (i = 0, tagArrayLength = tagArray.length; i < tagArrayLength; i = i + 1) {
                                cleanArray.push(tagArray[i].key);
                            }

                            // add the clean array
                            cleanEntry.selectedTags[key] =  cleanArray;
                        }
                    }

                    // return the cleanEntry object
                    return cleanEntry;
                };

                $scope.tagToValue = function (selectionArray, compareArray) {
                    var newArray = [], k, selectionArrayLength;

                    for (k = 0, selectionArrayLength = selectionArray.length; k < selectionArrayLength; k = k + 1) {
                        var key = selectionArray[k], i, compareArrayLength;
                        for (i = 0, compareArrayLength = compareArray.length; i < compareArrayLength; i = i + 1) {
                            if (key === compareArray[i].key) {
                                newArray.push(compareArray[i].value);
                            }
                        }
                    }

                    return newArray;
                };

                $scope.closeAlert = function (index) {
                    $scope.alerts.splice(index, 1);
                };

                $scope.init();
            }]);
}());