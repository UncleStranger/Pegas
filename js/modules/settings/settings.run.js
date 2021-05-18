(function() {
    "use strict";

    angular
        .module("app.settings")
        .run(settingsRun);

    settingsRun.$inject = ["$rootScope", "$stateParams"];

    function settingsRun($rootScope, $stateParams){
        
      // Global Settings
      // -----------------------------------
      $rootScope.app = {
        name: "Pegas",
        description: "Pegas app",
        year: ((new Date()).getFullYear()),
        sidebarOpen: !$stateParams.projectName,
        offsidebarOpen: false,
        asideToggled: false,
        viewAnimation: "ng-fadeInUp"
      };

      // Close submenu when sidebar change from collapsed to normal
      // $rootScope.$watch("app.layout.isCollapsed", function(newValue) {
      //   if( newValue === false )
      //     $rootScope.$broadcast("closeSidebarMenu");
      // });

    }

})();
