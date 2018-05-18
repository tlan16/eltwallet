export const getMessageList = messageObj => {
  return Object.keys(messageObj).map(uuid => {
    return { ...messageObj[uuid], uuid };
  });
};

export const markMessageAsRead = (selectedMessage, messages) => {
  return messages.map(message => {
    if (message.uuid == selectedMessage.uuid) {
      const read_at = new Date();
      return { ...message, read_at };
    }
    return message;
  });
};
