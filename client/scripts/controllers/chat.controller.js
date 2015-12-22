angular
  .module('Coach')
  .controller('ChatCtrl', ChatCtrl);
 
function ChatCtrl ($scope, $reactive, $stateParams) {
  $reactive(this).attach($scope);
 
  // use the $stateParams to get the chat id and then we will use angular-meteor’s helpers again to create a helpers that will fetch now the single chat
  let chatId = $stateParams.chatId;
 
  this.helpers({
    data() {
      return Chats.findOne(chatId);
    }
  });
}