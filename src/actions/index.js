export const fetchMessages = address => ({
  type: 'FETCH_MESSAGES_START',
  address: address,
});

export const receiveMessages = messages => ({
  type: 'FETCH_MESSAGES_SUCCESS',
  messages: messages,
});

export const failToReceive = err => ({
  type: 'FETCH_MESSAGES_FAIL',
  err: err,
});

export const sendMessage = message => ({
  type: 'SEND_MESSAGE',
  message: message,
});

export const sendMessageStart = () => ({
  type: 'SEND_MESSAGE_START',
});

export const sendMessageSuccess = () => ({
  type: 'SEND_MESSAGE_SUCCESS',
});

export const sendMessageFail = () => ({
  type: 'SEND_MESSAGE_FAIL',
});
