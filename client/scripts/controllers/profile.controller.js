(function() {
    'use strict';

    angular
      .module('Coach')
      .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$reactive', '$state', '$ionicLoading', '$ionicPopup', '$log'];

    function ProfileCtrl ($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
      var vm = this;

      $reactive(vm).attach($scope);
     
      let user = Meteor.user();
      let name = user && user.profile ? user.profile.name : '';
     
      vm.name = name;
      vm.updateName = updateName;
      vm.updatePicture = updatePicture;
     
      ////////////
     
      function updateName () {
        if (_.isEmpty(vm.name)) return;
     
        Meteor.call('updateName', vm.name, (err) => {
          if (err) return handleError(err);
          $state.go('tab.chats');
        });
      }
     
      function handleError (err) {
        $log.error('profile save error ', err);
     
        $ionicPopup.alert({
          title: err.reason || 'Save failed',
          template: 'Please try again',
          okType: 'button-positive button-clear'
        });
      }

      function updatePicture () {
        MeteorCameraUI.getPicture({ width: 60, height: 60 }, function (err, data) {
          if (err && err.error == 'cancel') {
            return;
          }
     
          if (err) {
            return handleError(err);
          }
     
          $ionicLoading.show({
            template: 'Updating picture...'
          });
     
          Meteor.call('updatePicture', data, (err) => {
            $ionicLoading.hide();
            handleError(err);
          });
        });
      }
    }
})();