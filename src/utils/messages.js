export const getMessageList = messageObj => {
  return Object.keys(messageObj).map(uuid => {
    return { ...messageObj[uuid], uuid };
  });
};

export const getMessageById = (id, messageObj) => {
  return messageObj[id];
};
