/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function () {
    'use strict';

    var core = angular.module("app.core");

    core.constant("APP_MEDIAQUERY", {
        "desktopLG": 1200,
        "desktop"  : 992,
        "tablet"   : 768,
        "mobile"   : 480
    });

    var local = window.location.host.indexOf("localhost") === 0;
    var origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

    core.constant("IsDebug", local);
    var apiBase = origin + '/api/';
    if(local) {
        apiBase = "http://localhost/api/";
    }
    core.constant("ApiBase", apiBase);
})();