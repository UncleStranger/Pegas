(function() {
    "use strict";

    angular.module("app.filters")
        .filter("myDecimal", myDecimalFilter);

    function myDecimalFilter() {
        return filterFilter;

        ////////////////
        function filterFilter(input, places) {
            if (isNaN(input)) return input;
            // If we want 1 decimal place, we want to mult/div by 10
            // If we want 2 decimal places, we want to mult/div by 100, etc
            // So use the following to create that factor
            var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
            return Math.round(input * factor) / factor;
        }
    }

})();