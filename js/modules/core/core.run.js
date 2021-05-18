(function () {
    "use strict";

    angular
        .module("app.core")
        .run(appRun);

    appRun.$inject = [
        "$rootScope",
        "$state",
        "$stateParams",
        "$window",
        "$log",
        "$location",
        "_",
        "localStorageService",
        "ApiBase",
        "Notify",
        "$timeout"
    ];

    // Make sure _ is invoked at runtime. This does nothing but force the "_" to
    // be loaded after bootstrap. This is done so the "_" factory has a chance to
    // "erase" the global reference to the lodash library.
    function appRun($rootScope,
                    $state,
                    $stateParams,
                    $window,
                    $log,
                    $location,
                    _,
                    localStorageService,
                    ApiBase,
                    Notify,
                    $timeout) {
        $log.debug("storageType: ", localStorageService.getStorageType());

        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        //$rootScope.$storage = $window.localStorage;

        $rootScope.ApiBase = ApiBase;

        $rootScope.profile = $rootScope.profile || undefined; // From token manager
        $rootScope.user = $rootScope.user || undefined; // From users table

        // Uncomment this to disable template cache
        /*$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
         if (typeof(toState) !== "undefined"){
         $templateCache.remove(toState.templateUrl);
         }
         });*/

        $rootScope.$on("authInterceptor:400", http400Handler);
        $rootScope.$on("authInterceptor:401", http401Handler);
        $rootScope.$on("authInterceptor:403", http403Handler);
        $rootScope.$on("authInterceptor:500", http500Handler);
        $rootScope.$on("authInterceptor:responseError", httpResponseErrorHandler);
        $rootScope.$on("authInterceptor:requestError", httpRequestErrorHandler);
        $rootScope.$on("authInterceptor:connRefused", httpConnRefusedHandler);

        function http400Handler(event, response) {
            $log.error("%s. (%s)", response.statusText, response.status);
            $timeout(function() {
                Notify.alert(getErrorMessage(response), { status: "danger", timeout: 2000 });
            });
        }

        function http401Handler(event, response) {
            $log.error("%s. (%s)", response.statusText, response.status);

            // $timeout(function() {
            //     Notify.alert(["Запрос токена", response.url], { status: "info", timeout: 1000 });
            // });
        }

        function http403Handler(event, response) {
            $log.error("%s. (%s)", response.statusText, response.status);
            $timeout(function() {
                Notify.alert(["Доступ запрещен", response.url], { status: "danger", timeout: 2000 });
            });
        }
        function http500Handler(event, response) {
            $log.error("%s. (%s)", response.statusText, response.status);
            $timeout(function() {
                Notify.alert(getErrorMessage(response), { status: "danger", timeout: 2000 });
            });
        }

        function httpRequestErrorHandler(event, response) {
            if(response.status == 404)
                return;

            $log.error("%s. (%s)", response.statusText, response.status);
            $timeout(function() {
                Notify.alert(getErrorMessage(response), { status: "danger", timeout: 2000 });
            });
        }

        function httpResponseErrorHandler(event, response) {
            if(response.status == 404)
                return;
            $log.error("%s. (%s)", response.statusText, response.status);
            $timeout(function() {
                Notify.alert(getErrorMessage(response), { status: "danger", timeout: 2000 });
            });
        }

        function httpConnRefusedHandler(event, response){
            var msg = "Connection to " + response.config.url + " is refused";
            $log.error(msg);
            Notify.alert(msg, { status: "danger", timeout: 2000 });
        }

        //separate method for parsing errors into a single flat array
        function getErrorMessage(response) {
            var msg = "";
            if(response.status)
                msg += response.status + " ";
            msg += (response.data && (response.data.message || response.data.Message)) ||
                response.message ||
                response.Message ||
                (response.statusText);
            return msg;
        } // getErrorMessage

        // cancel click event easily
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };

        // Hooks
        // -----------------------------------

        // Hook start
		/*
        $rootScope.$on("$stateChangeStart",
            function(event, toState, toParams, fromState, fromParams, options){
                //event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error

                if(typeof(toState) !== "undefined") {
                    if (toState.data && !!toState.data.noLogin) {

                    } else {
                        if (!tokenManager.expired) {
                            $rootScope.profile = tokenManager.profile;
                        } else {
                            // If user is unauthorized, redirect for token.
                            event.preventDefault();
                            var oauthRedirectRoute = toState.name;
                            $log.debug("RedirectForTokenCtrl: Set oauthRedirectRoute: %s", oauthRedirectRoute);
                            if (oauthRedirectRoute)
                                localStorageService.set("oauthRedirectRoute", oauthRedirectRoute);
                            else
                                localStorageService.remove("oauthRedirectRoute");
                            var oauthRedirectRouteParams = toParams;
                            if(oauthRedirectRouteParams){
                                localStorageService.set("oauthRedirectRouteParams", oauthRedirectRouteParams);
                            } else{
                                localStorageService.remove("oauthRedirectRouteParams");
                            }

                            return $state.go("redirectForToken");
                        }
                    }
                }
                return;
            });
		*/
        // Hook not found
        $rootScope.$on("$stateNotFound",
            function (event, unfoundState/*, fromState, fromParams*/) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });
        // Hook error
        $rootScope.$on("$stateChangeError",
            function (event, toState, toParams, fromState, fromParams, error) {
                $log.log(error);
            });

        // Hook success
        $rootScope.$on("$stateChangeSuccess",
            function (event, toState, toParams, fromState, fromParams) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                $rootScope.currTitle = $state.current.title;
            });

        // Load a title dynamically
        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function () {
            //var title = $rootScope.app.name + " - " + ($rootScope.currTitle || $rootScope.app.description);
            var title = "TEnergo";
            document.title = title;
            return title;
        };

        $rootScope.login = function () {
            $state.go("page.login");
        };

        $rootScope.logout = function () {
            //! $state.go("page.login");
        };

        // function setHeight() {
        //     var windowHeight = $(window).innerHeight();
        //     windowHeight= windowHeight - 50;
        //     console.log(windowHeight);
        //     $rootScope.windowHeight = windowHeight;
        // }
        //
        // $(window).resize(function() {
        //     setHeight();
        // });
        // setHeight();
    }

})();

