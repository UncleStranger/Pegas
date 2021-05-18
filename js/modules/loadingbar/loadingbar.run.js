(function () {
    "use strict";

    angular
        .module("app.loadingbar")
        .run(loadingbarRun)
    ;
    loadingbarRun.$inject = ["$rootScope", "$timeout", "cfpLoadingBar", "$log"];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar, $log) {

        // Loading bar transition
        // -----------------------------------
        var thBar;
        $rootScope.$on("$stateChangeStart", function () {
            //! if ($(".wrapper > section").length)
            if ($(".wrapper").length) // check if bar container exists
                thBar = $timeout(function () {
                    cfpLoadingBar.start();
                }, 0); // sets a latency Threshold
        });
        $rootScope.$on("$stateChangeSuccess", function (event) {
            event.targetScope.$watch("$viewContentLoaded", function () {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });

    }

})();