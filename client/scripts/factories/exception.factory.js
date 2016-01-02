(function() {
    'use strict';

    angular
        .module('Coach')
        .factory('exception', ExceptionHandler);

    ExceptionHandler.$inject = ['$log'];

    // Y111
    function ExceptionHandler(logging) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(reason) {
                logging.error(message, reason);
            };
        }
    }
})();