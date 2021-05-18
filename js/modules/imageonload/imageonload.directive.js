(function () {
    "use strict";

    angular
        .module("app.imageonload")
        .directive("imageonload", imageonloadFunc);
    imageonloadFunc.$inject = ["$parse", "$log"];
    function imageonloadFunc($parse, $log) {
        return {
            restrict: "A",
            replace: false,
            //scope: true,  // or no new scope -- i.e., remove this line
            link: function (scope, element, attrs) {
                element.bind('load', function() {
                    //call the function that was passed
                    scope.$apply(attrs.imageonload);
                });
            }
        };
    }
})();