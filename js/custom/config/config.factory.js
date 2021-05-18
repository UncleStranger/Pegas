(function () {
    "use strict";
    angular
        .module("app.config")
        .factory("Config", ConfigFunc);

    ConfigFunc.$inject = ["Restangular", "$http", "$q", "$timeout", "$log"];

    function ConfigFunc(Restangular, $http, $q, $timeout, $log) {
        var route = "";

        var Config = Restangular.all(route);
        Config.read = read;
        Config.save = save;

        ///// Impl /////
        function read(){
            return Config.customGET("");
        } // read

        function save(data) {
            return Config.customPOST(data, "");
        } // save

        /*
        var route = "";

        var TEnergo = Restangular.all(route);

        TEnergo.getStat = getStat;
        TEnergo.getSchemeJson = getSchemeJson;
        TEnergo.getMenu = getMenu;
        TEnergo.getObjects = getObjects;
        TEnergo.getTable = getTable;
        TEnergo.getEvents = getEvents;
        TEnergo.getEventsCount = getEventsCount;

        ///// Impl /////
        function getStat(projectName){
            return TEnergo.one("stat", projectName).get();
        } // getStat

        function getMenu(){
            return TEnergo.customGET("menu");
        } // getStat

        function getSchemeJson(projectName){
            return TEnergo.one("shapes", projectName).get();
        } // getSchemeJson

        function getObjects(){
            return TEnergo.all("browser").all("objects").getList();
        } // getObjects

        function getTable(projectName){
            return TEnergo.all("table").all(projectName).getList();
        } // getTable

        function getEvents(projectName){
            if(projectName)
                return TEnergo.all("events").all(projectName).getList();
            else
                return TEnergo.all("events").getList();
        } // getEvents

        function getEventsCount(){
            return TEnergo.one("events", "count").get();
        } // getEventsCount

        return TEnergo;
        */

        return Config;
    }

})();