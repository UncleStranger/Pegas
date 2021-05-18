(function(){
    "use strict";
    angular
        .module("app.filters")
        .filter("startsWith", startsWithFilter);

    startsWithFilter.$inject = ["_"];

    function startsWithFilter(_) {
        return function (list, search) {
            /*
            console.debug("startsWithFilter list, str", list, expected);
            if(!expected)
                return list;
            */

            if (list && (search || angular.isNumber(search))) {
                search = search.toString().toLowerCase();
                return _.filter(list, function (item) {
                    var lowerItem = (item + "").toLowerCase();
                    return lowerItem.indexOf(search) === 0;
                });

            }else{
                return list;
            }

        };
    }
})();