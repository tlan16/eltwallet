import { markMessageAsRead } from '../utils/messages';

const defaultState = {
  messages: [],
  isSendingMessage: false,
  unreadMessageCount: 0,
};
const messageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_MESSAGE':
      const messages = markMessageAsRead(
        action.selectedMessage,
        state.messages,
      );
      return {
        ...state,
        messages: messages,
        selectedMessage: action.selectedMessage,
      };
    case 'FETCH_UNREAD_MESSAGE_SUCCESS':
      return {
        ...state,
        unreadMessageCount: action.count,
      };
    case 'FETCH_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: action.messages,
      };
    case 'SEND_MESSAGE_SUCCESS':
      return {
        ...state,
        isSendingMessage: false,
      };
    case 'SEND_MESSAGE_START':
      return {
        ...state,
        isSendingMessage: true,
      };
    case 'SEND_MESSAGE_FAIL':
      return {
        ...state,
        isSendingMessage: false,
      };
    default:
      return state;
  }
};

export default messageReducer;
export const getMessages = state => state.messages;
export const getSelectedMessage = state => state.selectedMessage;
export const getIsSendingMessage = state => state.isSendingMessage;
export const getUnreadMessageCount = state => state.unreadMessageCount;
