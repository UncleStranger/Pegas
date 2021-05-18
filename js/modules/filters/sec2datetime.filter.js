/**
 <b>{{seconds | sec2datetime | date:'HH:mm:ss'}}</b>
*/

(function() {
    'use strict';

    angular.module('app.filters')
        .filter('sec2datetime', sec2datetimeFilter);

    function sec2datetimeFilter() {
        return sec2datetime;

        function sec2datetime(seconds) {
            var d = new Date(0,0,0,0,0,0,0);

            d.setSeconds(seconds);

            return d;
        }
    }

})();