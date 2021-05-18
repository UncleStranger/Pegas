(function(){
    "use strict";

    angular.module("app.filters")
    /**
     * Highlights text that matches $select.search.
     *
     * Taken from AngularUI Bootstrap Typeahead
     * See https://github.com/angular-ui/bootstrap/blob/0.10.0/src/typeahead/typeahead.js#L340
     */
        .filter('highlight', function() {
            function escapeRegexp(queryToEscape) {
                return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
            }

            return function(matchItem, query) {
                return query && matchItem ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<span class="ui-select-highlight">$&</span>') : matchItem;
            };
        });
})();