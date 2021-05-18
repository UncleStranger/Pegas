/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function () {
    "use strict";

    angular
        .module("app.topnavbar")
        .controller("TopNavbarCtrl", TopNavbarCtrl);

    TopNavbarCtrl.$inject = ["$scope", "$log", "$timeout", "$state", "$stateParams", "_", "Utils"];
    function TopNavbarCtrl($scope, $log, $timeout, $state, $stateParams, _, Utils) {
        var vm = this;

        ////// Props //////
        vm.eventsCount = 0;

        ////// Funcs //////
        vm.isMobile = Utils.isMobile;

        ////// Local vars //////
        var stopRefreshCount;

        activate();

        ////// Impl //////
        function activate() {
            $log.debug("TopNavbarCtrl activated");

            $scope.$on("$destroy", function iVeBeenDismissed() {
                if (angular.isDefined(stopRefreshCount)) {
                    $timeout.cancel(stopRefreshCount);
                }
                $log.warn("TopNavbarCtrl destroyed.");
            });
        } // activate
    }
})();
