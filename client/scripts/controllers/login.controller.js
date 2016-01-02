(function() {
    'use strict';

    angular
      .module('Coach')
      .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$reactive', '$state', '$ionicLoading', '$ionicPopup', '$log'];

    function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
      var vm = this;

      $reactive(vm).attach($scope);
     
      vm.login = login;
     
      ////////////
     
      function login() {
        if (_.isEmpty(vm.phone)) return;
     
        let confirmPopup = $ionicPopup.confirm({
          title: 'Number confirmation',
          template: '<div>' + vm.phone + '</div><div>Is your phone number above correct?</div>',
          cssClass: 'text-center',
          okText: 'Yes',
          okType: 'button-positive button-clear',
          cancelText: 'edit',
          cancelType: 'button-dark button-clear'
        });
     
        confirmPopup.then((res) => {
          if (!res) return;
     
          $ionicLoading.show({
            template: 'Sending verification code...'
          });
     
          Accounts.requestPhoneVerification(vm.phone, (err) => {
            $ionicLoading.hide();
     
            if (err) {
              return handleError(err);
            }
     
            $state.go('confirmation', {phone: vm.phone});
          });
        });
      }
     
      function handleError(err) {
        $log.error('Login error ', err);
     
        $ionicPopup.alert({
          title: err.reason || 'Login failed',
          template: 'Please try again',
          okType: 'button-positive button-clear'
        });
      }
    }
})();