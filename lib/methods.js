Meteor.methods({
  newMessage (message) {
  	// Value pattern check brought by "check" package 
  	check(message, {
      text: String,
      type: String,
      chatId: String
    });
    message.timestamp = new Date();
 
    let messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });
 
    return messageId;
  }
});