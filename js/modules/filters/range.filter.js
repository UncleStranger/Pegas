/**
 * Creates a range
 * Usage example: <option ng-repeat="y in [] | range:1998:1900">{{y}}</option>
 */
(function() {
    'use strict';

    angular.module('app.filters')
        .filter('range', rangeFilter);

    function rangeFilter() {
        return filterFilter;

        ////////////////
        function filterFilter(input, start, end) {
            start = parseInt(start);
            end = parseInt(end);
            var direction = (start <= end) ? 1 : -1;
            do {
                input.push(start);
                start += direction;
            } while (start - direction != end);
            return input;
        }
    }

})();