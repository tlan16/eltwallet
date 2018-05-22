export const fetchMessages = address => ({
  type: 'FETCH_MESSAGES_START',
  address: address,
});

export const fetchUnreadMessageCount = address => ({
  type: 'FETCH_UNREAD_MESSAGE_COUNT_START',
  address: address,
});

export const receiveMessages = messages => ({
  type: 'FETCH_MESSAGES_SUCCESS',
  messages: messages,
});

export const receiveUnreadMessageCount = count => ({
  type: 'FETCH_UNREAD_MESSAGE_SUCCESS',
  count: count,
});

export const failToReceive = err => ({
  type: 'FAIL_TO_RECEIVE',
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

export const sendMessageFail = err => ({
  type: 'SEND_MESSAGE_FAIL',
  err: err,
});

export const saveProfile = (email, nickname) => ({
  type: 'SAVE_PROFILE',
  email: email,
  nickname: nickname,
});
export const setProfile = (email, nickname, address) => ({
  type: 'SET_PROFILE',
  email: email,
  nickname: nickname,
  address: address,
});

export const setProfileStart = () => ({
  type: 'SET_PROFILE_START',
});

export const setProfileFail = err => ({
  type: 'FAIL_TO_SET_PROFILE',
  err: err,
});
