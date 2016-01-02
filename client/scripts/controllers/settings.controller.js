(function() {
    'use strict';

    angular
      .module('Coach')
      .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope', '$reactive', '$state'];

    function SettingsCtrl($scope, $reactive, $state) {
      var vm = this;

      $reactive(vm).attach($scope);
     
      vm.logout = logout;
     
      function logout() {
        Meteor.logout((err) => {
          // if (!err) return;
          $state.go('login');
        });
      }
    }
})();