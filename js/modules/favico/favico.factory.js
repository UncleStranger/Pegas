(function(){
    "use strict";
    angular
        .module("app.favico")
        .factory("Favico", FavicoFunc);

    function FavicoFunc() {
        var favico = new Favico({
            animation : "fade"
        });

        var badge = function(num) {
            favico.badge(num);
        };
        var reset = function() {
            favico.reset();
        };

        return {
            badge : badge,
            reset : reset
        };
    }
})();