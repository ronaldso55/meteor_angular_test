angular
  .module('Coach')
  .controller('ChatsCtrl', ChatsCtrl);

/**
 * 1. scope is bind to this via controller-as pattern.
 * 2. $reactive is added from the get-go.
 */
function ChatsCtrl ($scope, $reactive, NewChat) {
  $reactive(this).attach($scope);

  this.showNewChatModal = showNewChatModal;
  this.remove = remove;

  this.helpers({
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