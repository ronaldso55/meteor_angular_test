(function() {
    'use strict';

    angular
      .module('Coach')
      .run(Runner);

    Runner.$inject = ['$rootScope', '$state', 'exception'];

    function Runner($rootScope, $state, exception) {
      // TODO: Add all factory initiation methods here if they need to run during startup.

      $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
          // We can catch the error thrown when the $requireUser promise is rejected
          // and redirect the user back to the main page
          // console.log("Entering auth:run");
          if (error === 'AUTH_REQUIRED') {
            $state.go('login');
          }
        });

      // Y112
      $rootScope.$on('$routeChangeError',
        function(event, current, previous, rejection) {
            if (handlingRouteChangeError) { return; }
            handlingRouteChangeError = true;
            var destination =
              (current && (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
            var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');

            /**
             * Optionally log using a custom service or $log.
             * (Don't forget to inject custom service)
             */
            exception.catcher(msg, [current]);

            /**
             * On routing error, go to another route/state.
             */
            $state.go('login');
        });
    }
})();