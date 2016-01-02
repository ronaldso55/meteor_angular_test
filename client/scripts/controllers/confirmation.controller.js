(function() {
    'use strict';

    angular
      .module('Coach')
      .controller('ConfirmationCtrl', ConfirmationCtrl);

    ConfirmationCtrl.$inject = ['$scope', '$reactive', '$state', '$ionicPopup', '$log'];

    function ConfirmationCtrl($scope, $reactive, $state, $ionicPopup, $log) {
      var vm = this;

      $reactive(vm).attach($scope);
     
      vm.phone = $state.params.phone;
      vm.confirm = confirm;
     
      ////////////
     
      function confirm() {
        if (_.isEmpty(vm.code)) return;
     
        Accounts.verifyPhone(vm.phone, vm.code, function (err) {
          if (err) return handleError(err);
          $state.go('profile');
        });
      }
     
      function handleError(err) {
        $log.error('Verfication error ', err);
     
        $ionicPopup.alert({
          title: err.reason || 'Verfication failed',
          template: 'Please try again',
          okType: 'button-positive button-clear'
        });
      }
    }
})();