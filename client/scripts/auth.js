angular
  .module('Coach')
  .run(run);
 
function run($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    console.log("Entering auth:run");
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
}