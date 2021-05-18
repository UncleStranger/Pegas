(function () {
    "use strict";
    angular
        .module("pegas", [
            // -------------------
            "app.errorcatcher",
            "app.lodash",
            "app.settings",
            "app.core",
            "app.filters",
            "app.imageonload",
            "app.lazyload",
            "app.routehelpers",
            "app.routes",
            "app.notify",
            "app.loadingbar",
            //"app.settings",
            "app.utils",
            //"app.files",
            //"app.dropzone",
            "app.favico",
            "app.kinetic",
            "app.topnavbar",
            "app.logout",
            "app.config"
        ]);
})();