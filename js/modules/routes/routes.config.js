/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    "use strict";

    angular
        .module("app.routes")
        .config(routesConfig);

    routesConfig.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider", "RouteHelpersProvider"];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        //$locationProvider.html5Mode(true).hashPrefix("!");

        $urlRouterProvider.otherwise("/config");


        //
        // Application Routes
        // -----------------------------------
		
		// See https://habrahabr.ru/post/222065/
        $stateProvider
            .state("app", {
                // url        : "/app",
                abstract   : true,
                templateUrl: helper.basepath("app.html"),
                //template: "<div data-ui-view='' data-autoscroll='false' data-ng-cloak=''></div>",
                resolve    : helper.resolveFor("fastclick", "modernizr", "animo", "classyloader", "toaster", "whirl", "angularBootstrapNavTree")
            })		

            .state("callback", {
                url: "/callback/:response",
                abstract: false,
                controller: "CallbackCtrl",
                template: "<div class='loader-inner ball-pulse text-center'><div></div><div></div><div></div></div>",
                data: { noLogin: true }
            })
			
            .state("logout", {
                url: "/logout/",
                abstract: false,
                controller: "LogoutCtrl",
                templateUrl: helper.basepath("tenergo/logout.html"),
                data: { noLogin: true }
            })

            .state("app.config", {
                url        : "/config",
                controller      : "ConfigCtrl",
                controllerAs    : "vm",
                templateUrl: helper.basepath("pegas/config.html"),
                data: { noLogin: true }
            })
        ;

    } // routesConfig

})();

