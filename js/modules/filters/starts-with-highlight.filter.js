/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 */
(function () {
    'use strict';

    angular.module('app.filters')
        .filter('startsWithHighlight', startsWithHighlightFilter);

        function startsWithHighlightFilter() {

            return function (text, search, caseSensitive) {
                if (text && (search || angular.isNumber(search))) {
                    text   = text.toString();
                    search = search.toString();
                    return text.replace(new RegExp(search, !caseSensitive ? 'i' : ''), '<span class="ui-match">$&</span>');
                    /*
                    if (caseSensitive) {
                        return text.split(search).join('<span class="ui-match">' + search + '</span>');
                    } else {
                        return text.replace(new RegExp(search, 'i'), '<span class="ui-match">$&</span>');
                    }
                    */
                }

                return text;
            };
        }

})();