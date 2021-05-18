(function () {
    "use strict";
    angular
        .module("app.errorcatcher")
        .factory("$exceptionHandler", ErrorCatcher);

    ErrorCatcher.$inject = ["$injector", "$log"];
    function ErrorCatcher($injector, $log){
        return function exceptionHandler(exception, cause) {
            //logErrorsToBackend(exception, cause);
            $log.warn(exception, cause);
            // var errMsg = (exception && exception.message) || (exception && exception.error) || exception;
            // $log.error(errMsg + "\r\n Exception: %o\r\n Cause: %o", exception, cause);
            // var Notify = $injector.get("Notify");
            // Notify.alert("Ошибка " + errMsg, {status: "danger", timeout: 3000});
        };
    } // errorCatcherFunc
})();