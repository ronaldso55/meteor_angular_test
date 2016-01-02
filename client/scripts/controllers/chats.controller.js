(function() {
    'use strict';

    angular
      .module('Coach')
      .controller('ChatsCtrl', ChatsCtrl);

    ChatsCtrl.$inject = ['$scope', '$reactive', 'NewChat'];

    /**
     * 1. scope is bind to this via controller-as pattern.
     * 2. $reactive is added from the get-go.
     */
    function ChatsCtrl ($scope, $reactive, NewChat) {
      var vm = this;

      $reactive(vm).attach($scope);

      vm.showNewChatModal = showNewChatModal;
      vm.remove = remove;

      vm.helpers({
        data() {
          return Chats.find();
        }
      });

      ////////////
      function showNewChatModal() {
        NewChat.showModal();
      }

      function remove (chat) {
        Meteor.call('removeChat', chat._id);
      }
    }
})();