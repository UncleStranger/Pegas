/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function () {
    "use strict";

    angular
        .module("app.logout")
        .controller("LogoutCtrl", LogoutCtrl);

    LogoutCtrl.$inject = ["$scope", "$log", "$timeout", "$state", "$stateParams", "_"];
    function LogoutCtrl($scope, $log, $timeout, $state, $stateParams, _) {
        var vm = this;

        ////// Props //////

        ////// Funcs //////

        ////// Local vars //////

        activate();

        ////// Impl //////
        function activate() {
            $log.debug("LogoutCtrl activated");

        } // activate
    }
})();
