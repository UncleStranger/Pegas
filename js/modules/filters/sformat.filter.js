/**
 * Format a string
 * Usage example:
 * {{ "{0} {1}" | sformat:"Lorem":"ipsum" }}
 *
 *
 * $scope.model = { param1: "Lorem", param2: "ipsum" }
 *
 * {{ "{param1}  {param2}" | sformat:$scope.model   }}
 */
(function(){
    "use strict";
    angular
        .module("app.filters")
        .filter("sformat", filterSFormat);

        filterSFormat.$inject = ["_"];

        function filterSFormat(_) {
            return sformat;

            function sformat() {
                return _.sformat.apply(this, arguments);
            }
        }
})();