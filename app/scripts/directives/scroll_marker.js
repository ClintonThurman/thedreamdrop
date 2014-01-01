/* Directives */
(function() {
    'use strict';

    angular.module('dreamDropApp')

        .directive('scrollmarker', function () {
            return {
                restrict: 'A',
                scope: {
                    action: '&',
                    pause: '@'
                },
                link: function (scope, element, attr) {
                    var containerSelector = attr.container || '.ml_scroll',
                        contentSelector = attr.content || 'div',
                        type = attr.type || 'bottom',
                        distance = attr.distance || '0';

                    var container = element.parents(containerSelector + ':first'),
                        content = element.parents(contentSelector + ':first');

                    container.bind('scroll', { distance: distance, type: type }, function () {
                        var containerHeight = container[0].clientHeight,
                            contentHeight = content[0].clientHeight,
                            scroll = container.scrollTop(),
                            distanceToBottom = contentHeight - (containerHeight + scroll);

                        if ((distanceToBottom - distance) <= 0 && scope.pause !== 'true') {
                            scope.$apply(function (scope) {
                                scope.action();
                            });
                        }
                    });
                }
            };
        });
}());