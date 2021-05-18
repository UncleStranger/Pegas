/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */

(function () {
    'use strict';

    angular
        .module('app.filters')
        .filter('propsFilter', propsFilter);

    function propsFilter() {
        return filterFilter;

        ////////////////
        function filterFilter(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();

                        // Patch:
                        if(item[prop]) {
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }

        // function filterFilter(items, props) {
        //     var out = [];
        //     if (angular.isArray(items)) {
        //         items.forEach(function(item) {
        //             var itemMatches = false;
        //             var keys = Object.keys(props);
        //             var optionValue = '';
        //             for (var i = 0; i < keys.length; i++) {
        //                 optionValue = item[keys[i]] ? optionValue + item[keys[i]].toString().toLowerCase().replace(/ /g, '') : '';
        //             }
        //             for (var j = 0; j < keys.length; j++) {
        //                 var text = props[keys[j]].toLowerCase().replace(/ /g, '');
        //                 if (optionValue.indexOf(text) !== -1) {
        //                     itemMatches = true;
        //                     break;
        //                 }
        //             }
        //             if (itemMatches) {
        //                 out.push(item);
        //             }
        //         });
        //     } else {
        //         // Let the output be the input untouched
        //         out = items;
        //     }
        //
        //     return out;
        // }
    }



})();