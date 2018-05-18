import request from 'superagent';
import {
  receiveMessages,
  receiveUnreadMessageCount,
  failToReceive,
  sendMessageStart,
  sendMessageSuccess,
  sendMessageFail,
} from '../actions';
import { getMessageList } from '../utils/messages';

const base_url = `http://${window.location.hostname}:3000`;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const messageService = store => next => action => {
  next(action);
  switch (action.type) {
    case 'FETCH_MESSAGES_START':
      fetchMessages(action.address, receiveMessages, failToReceive, next);
      break;
    case 'SELECT_MESSAGE':
      markMessageAsRead(action.selectedMessage);
      break;
    case 'SEND_MESSAGE':
      sendMessage(action.message, sendMessageSuccess, sendMessageFail, next);
      break;
    case 'FETCH_UNREAD_MESSAGE_COUNT_START':
      fetchUnreadMessageCount(
        action.address,
        receiveUnreadMessageCount,
        failToReceive,
        next,
      );
      break;
    default:
      break;
  }
};

const fetchMessages = (address, receiveMessages, failToReceive, next) => {
  const fetch_messages_url = `${base_url}/api/messages/recipient/${address}`;
  request.get(fetch_messages_url).end((err, res) => {
    if (err) {
      return next(failToReceive(err));
    }
    const messages = getMessageList(JSON.parse(res.text));
    next(receiveMessages(messages));
  });
};

const fetchUnreadMessageCount = (
  address,
  receiveUnreadMessageCount,
  failToReceive,
  next,
) => {
  const fetch_unread_messages_count_url = `${base_url}/api/unread-message/recipient/${address}/count`;
  request.get(fetch_unread_messages_count_url).end((err, res) => {
    if (err) {
      return next(failToReceive(err));
    }
    const count = JSON.parse(res.text);
    next(receiveUnreadMessageCount(count));
  });
};

const markMessageAsRead = selectedMessage => {
  const message = { ...selectedMessage, read_at: new Date() };
  const message_uuid = selectedMessage.uuid;
  const mark_message_as_read_url = `${base_url}/api/message/mark-read/${message_uuid}`;
  console.log(mark_message_as_read_url);
  request
    .put(mark_message_as_read_url)
    .set('Content-Type', 'json')
    .end((err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(res);
    });
};

const sendMessage = (message, sendMessageSuccess, sendMessageFail, next) => {
  const create_message_url = `${base_url}/api/message`;
  next(sendMessageStart());
  request
    .post(create_message_url)
    .send(message)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        delay(2000).then(() => next(sendMessageFail(err)));
      }
      delay(2000).then(() => next(sendMessageSuccess()));
    });
};
