(function () {
    "use strict";
    angular
        .module("app.filters")
        .filter("newlines", newlinesFilter);

    function newlinesFilter() {
        return function (text) {
            return text.split(/\n/g);
        };
    }
})();