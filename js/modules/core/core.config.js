(function () {
    "use strict";

    angular
        .module("app.core")
        .config(coreConfig);

    coreConfig.$inject = [
        "$controllerProvider",
        "$compileProvider",
        "$filterProvider",
        "$provide",
        "ApiBase",
        "RestangularProvider",
        "localStorageServiceProvider",
        "$httpProvider",
        "$animateProvider"
    ];
    function coreConfig($controllerProvider,
                        $compileProvider,
                        $filterProvider,
                        $provide,
                        ApiBase,
                        RestangularProvider,
                        localStorageServiceProvider,
                        $httpProvider,
                        $animateProvider) {

        //$animateProvider.classNameFilter(/animate-/);

        /**** Local storage config ****/
        localStorageServiceProvider
            .setPrefix("ten")
            .setStorageType("sessionStorage");

        /**** Restangular config ****/
        //RestangularProvider.setBaseUrl(ApiBase + "/api");
        RestangularProvider.setBaseUrl(ApiBase);

        RestangularProvider.addResponseInterceptor(restangularResponseInterceptor);

        function restangularResponseInterceptor (data, operation, what, url, response, deferred) {
            var extractedData;
            // .. to look for getList operations
            if (operation === "getList" && !!data.items) {
                // .. and handle the data and meta data
                extractedData        = data.items;
                extractedData.paging =
                {
                    pageCount       : data.pageCount,
                    pageNo          : data.pageNo,
                    pageSize        : data.pageSize,
                    totalRecordCount: data.totalRecordCount,
                    countsDic       : data.countsDic
                };
            } else {
                extractedData = data;
            }
            return extractedData;
        }

        var core = angular.module("app.core");
        // registering components after bootstrap
        core.controller = $controllerProvider.register;
        core.directive  = $compileProvider.directive;
        core.filter     = $filterProvider.register;
        core.factory    = $provide.factory;
        core.service    = $provide.service;
        core.constant   = $provide.constant;
        core.value      = $provide.value;

        /*extendExceptionHandler.$inject = ["$delegate", "$injector"];
        $provide.decorator("$exceptionHandler", extendExceptionHandler);*/
    }
})();