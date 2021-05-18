(function () {
    "use strict";
    angular.module("app.config")
        .controller("ConfigCtrl", ConfigCtrl);

    ConfigCtrl.$inject = ["$scope", "$log", "_", "$timeout", "$interval", "$stateParams", "Notify", "ApiBase", "Config"];
    function ConfigCtrl($scope, $log, _, $timeout, $interval, $stateParams, Notify, ApiBase, Config) {
        var vm = this;

        ////// Props //////
        vm.loading = false;
        vm.config = undefined;

        ////// Funcs //////
        vm.save = save;

        ////// Local vars //////
        var stopRefreshEventsTimeout;

        activate();

        ////// Impl //////

        function activate() {
            $log.debug("ConfigCtrl activated");

            $scope.$on("$destroy", function iVeBeenDismissed() {
                if (angular.isDefined(stopRefreshEventsTimeout)) {
                    $timeout.cancel(stopRefreshEventsTimeout);
                }
                $log.debug("ConfigCtrl destroyed.");
            });

            readConfig();
        } // activate

        function readConfig() {
            vm.loading = true;
            Config.read().then(function(data){
                vm.config = data.plain();
            }, function(err){
                $log.error(err);
            }).finally(function(){
                vm.loading = false;
            });
        }

        function save() {
            Config.save(vm.config);
        } //save

    } //ConfigCtrl
})();
