angular
  .module('Coach')
  .controller('ChatsCtrl', ChatsCtrl);

/**
 * 1. scope is bind to this via controller-as pattern.
 * 2. $reactive is added from the get-go.
 */
function ChatsCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.remove = remove;

  this.helpers({
    data() {
      return Chats.find();
    }
  });

  ////////////

  function remove (chat) {
    this.data.remove(chat);
  }
}