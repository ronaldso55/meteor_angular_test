(function() {
    'use strict';

    angular
      .module('Coach')
      .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = ['$scope', '$reactive', '$stateParams', '$ionicScrollDelegate', '$timeout'];

    function ChatCtrl ($scope, $reactive, $stateParams, $ionicScrollDelegate, $timeout) {
      var vm = this;

      $reactive(vm).attach($scope);
     
      // use the $stateParams to get the chat id and then we will use angular-meteor’s helpers again to create a helpers that will fetch now the single chat
      let chatId = $stateParams.chatId;
      let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

      vm.sendMessage = sendMessage;
      vm.inputUp = inputUp;
      vm.inputDown = inputDown;
      vm.closeKeyboard = closeKeyboard;

      vm.helpers({
      	messages() {
          return Messages.find({ chatId: chatId });
        },
        data() {
          return Chats.findOne(chatId);
        }
      });

      $scope.$watchCollection('chat.messages', (oldVal, newVal) => {
        let animate = oldVal.length !== newVal.length;
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
      });

      function sendMessage () {
        if (_.isEmpty(vm.message)) return;
     
        Meteor.call('newMessage', {
          text: vm.message,
          type: 'text',
          chatId: chatId
        });
     
        delete vm.message;
      }

      function inputUp () {
        if (isIOS) {
          vm.keyboardHeight = 216;
        }
     
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        }, 300);
      }
     
      function inputDown () {
        if (isIOS) {
          vm.keyboardHeight = 0;
        }
     
        $ionicScrollDelegate.$getByHandle('chatScroll').resize();
      }
     
      function closeKeyboard () {
        // cordova.plugins.Keyboard.close();
      }
    }
})();