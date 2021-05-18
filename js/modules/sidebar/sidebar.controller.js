/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function () {
    "use strict";

    angular
        .module("app.sidebar")
        .controller("SidebarCtrl", SidebarCtrl);

    SidebarCtrl.$inject = ["$rootScope", "$scope", "$log", "$timeout", "$state", "$stateParams", "_", "TEnergo", "Notify", "Utils"];
    function SidebarCtrl($rootScope, $scope, $log, $timeout, $state, $stateParams, _, TEnergo, Notify, Utils) {
        var vm = this;

        ////// Props //////
        vm.treeControl = {};
        vm.menuLoading = false;

        vm.menuItems = [];
        //vm.initialSelection = undefined;
        vm.projectName = $stateParams.projectName;

        ////// Funcs //////
        vm.onTreeSelect = onTreeSelect;

        ////// Local vars //////

        activate();

        ////// Impl //////
        function activate() {
            $log.debug("SidebarCtrl activated");

            $scope.$on("$destroy", function iVeBeenDismissed() {
                $log.warn("SidebarCtrl controller destroyed.");
            });

            loadMenu();

            $rootScope.$on("$stateChangeSuccess",
                function (event, toState, toParams, fromState, fromParams) {
                    if(!toParams.projectName){
                        $timeout(function(){
                            if(vm.treeControl)
                                vm.treeControl.select_first_branch();
                        }, 1000);
                    }
                });
        } // activate

        function loadMenu(){
            vm.menuLoading = true;
            TEnergo.getMenu().then(function(data){
                vm.menuLoading = false;
                vm.menuItems = data.plain();

                if(vm.projectName) {
                    var menuItem = _.searchTree(vm.menuItems, "children", "projectName", vm.projectName);
                    if(menuItem) {
                        $timeout(function(){
                            if(vm.treeControl)
                                vm.treeControl.select_branch(menuItem);
                        }, 1000);
                    }
                } else{
                    $timeout(function(){
                        if(vm.treeControl)
                            vm.treeControl.select_first_branch();
                    }, 1000);
                }
            }, function(err){
                $log.log(arguments);
                //Notify.alert("Не удалось загрузить меню.", {status: "danger", timeout: 3000});
                $log.error("Error while load menu ", err);
                $timeout(loadMenu, 15000);
            });
        } // loadMenu

        function onTreeSelect(branch) {
            if(branch && branch.projectName) {
                //Hide sidebar
                $rootScope.app.sidebarOpen = false;

                var stateName = $state.current.name;

                if(!$stateParams.projectName && Utils.isMobile()){
                    $state.go("app.table", {projectName: branch.projectName});
                } else if(stateName == "app.table") {
                    $state.go("app.table", {projectName: branch.projectName});
                } else if(stateName == "app.events") {
                    $state.go("app.events", {projectName: branch.projectName});
                }
                else {
                    $state.go("app.home", {projectName: branch.projectName});
                }
            }
        } // onTreeSelect
    }
})();
