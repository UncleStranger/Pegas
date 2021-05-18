(function () {
    "use strict";

    angular
        .module("app.kinetic")
        .directive("kinetic", kineticFunc);
    kineticFunc.$inject = ["$parse", "$log", "$timeout"];
    function kineticFunc($parse, $log, $timeout) {
        return {
            restrict: "AE",
            replace: false,
            //scope: true,  // or no new scope -- i.e., remove this line
            link: function (scope, element, attrs) {
                $(element).kinetic({
                    // filterTarget: function(target, e)
                    // {
                    //     if ($(target).is(".node") || $(target).closest(".node").length)
                    //     {
                    //         return false;
                    //     }
                    // }
                });
                $timeout(function(){
                    $(element).kinetic("jumpTo", { x: 150, y: 0 });
                    $timeout(function(){
                        $(element).kinetic("start", { velocity: 0 });
                    }, 500);
                }, 1000);
                //element.scrollLeft = 50;
                // scope.height = $window.innerHeight;
                // function onResize(){
                //     // uncomment for only fire when $window.innerWidth change
                //     // if (scope.width !== $window.innerWidth)
                //     {
                //         scope.width = $window.innerWidth;
                //         scope.$digest();
                //     }
                // };
                //
                // function cleanUp() {
                //     angular.element($window).off("resize", onResize);
                // }
                // angular.element($window).on("resize", onResize);
                // scope.$on("$destroy", cleanUp);
            }
        };
    }
})();