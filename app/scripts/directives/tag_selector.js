/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')
        .directive('tagselector', function () {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    label: '@',
                    locale: '@',
                    tagkey: '@',
                    tags: '=',
                    selectedtags: '='
                },
                link: function (scope) {
                    scope.selectTag = function (tag) {
                        var key = tag.key,
                            keyIndex = -1,
                            selectedTagsLength = scope.selectedtags[scope.tagkey].length,
                            i;

                        for (i = 0; i < selectedTagsLength; i++) {
                            if (scope.selectedtags[scope.tagkey][i].key === key) {
                                keyIndex = i;
                                break;
                            }
                        }

                        if (tag.selected) {
                            tag.selected = false;
                            if (keyIndex !== -1) {
                                tag.primary = false;
                                scope.selectedtags[scope.tagkey].splice(keyIndex, 1);
                                //console.log('removed');
                            }
                        } else {
                            tag.selected = true;
                            if (keyIndex === -1) {
                                scope.selectedtags[scope.tagkey].push(tag);
                                //console.log('added');
                            }
                        }
                    };
                },
                templateUrl: 'partials/tagselector.html',
                replace: true
            };
        });
}());