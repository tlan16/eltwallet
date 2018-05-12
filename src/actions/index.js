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
