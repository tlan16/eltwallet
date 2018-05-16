import request from 'superagent';
import {
  fetchMessages,
  receiveMessages,
  failToReceive,
  sendMessageSuccess,
  sendMessageFail,
} from '../actions';
import { getMessageList } from '../utils/messages';

const base_url = `http://${window.location.hostname}:3000`;

export const messageService = store => next => action => {
  next(action);
  switch (action.type) {
    case 'FETCH_MESSAGES_START':
      fetchMessagesStart(action.address, receiveMessages, failToReceive, next);
      break;
    case 'SELECT_MESSAGE':
      markMessageAsRead(action.selectedMessage);
      break;
    case 'SEND_MESSAGE_START':
      sendMessageStart(action.message);
      break;
    default:
      break;
  }
};

const fetchMessagesStart = (address, receiveMessages, failToReceive, next) => {
  const fetch_messages_url = `${base_url}/api/messages/recipient/${address}`;
  request.get(fetch_messages_url).end((err, res) => {
    if (err) {
      return next(failToReceive(err));
    }
    const messages = getMessageList(JSON.parse(res.text));
    next(receiveMessages(messages));
  });
};

const markMessageAsRead = selectedMessage => {
  const message = { ...selectedMessage, read_at: new Date() };
  const message_uuid = selectedMessage.uuid;
  const mark_message_as_read_url = `${base_url}/api/message/mark-read/${message_uuid}`;
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

const sendMessageStart = (
  message,
  sendMessageSuccess,
  sendMessageFail,
  next,
) => {
  const create_message_url = `${base_url}/api/message`;
  request
    .post(create_message_url)
    .send(message)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        next(sendMessageFail);
      }
      next(sendMessageSuccess);
    });
};
