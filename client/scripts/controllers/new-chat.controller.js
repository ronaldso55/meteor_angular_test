(function() {
    'use strict';

    angular
      .module('Coach')
      .controller('NewChatCtrl', NewChatCtrl);

    NewChatCtrl.$inject = ['$scope', '$reactive', '$state', 'NewChat'];

    function NewChatCtrl($scope, $reactive, $state, NewChat) {
      var vm = this;

      $reactive(vm).attach($scope);
     
      vm.hideNewChatModal = hideNewChatModal;
      vm.newChat = newChat;
     
      vm.subscribe('users');

      vm.helpers({
        users() {
          return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
        }
      });
     
      ////////////
     
      function hideNewChatModal() {
        NewChat.hideModal();
      }
     
      function newChat(userId) {
        let chat = Chats.findOne({ type: 'chat', userIds: { $all: [Meteor.userId(), userId] } });
        if (chat) {
          return goToChat(chat._id);
        }
     
        Meteor.call('newChat', userId, goToChat);
      }
     
      function goToChat(chatId) {
        hideNewChatModal();
        return $state.go('tab.chat', { chatId: chatId });
      }
    }
})();