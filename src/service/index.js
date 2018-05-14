import request from 'superagent';
import { fetchMessages, receiveMessages, failToReceive } from '../actions';
const base_url = 'http://localhost:3000';

export const messageService = store => next => action => {
  next(action);
  switch (action.type) {
    case 'FETCH_MESSAGES_START':
      const fetch_messages_url = `${base_url}/api/message/recipient/${
        action.address
      }`;
      request.get(fetch_messages_url).end((err, res) => {
        if (err) {
          return next(failToReceive(err));
        }
        const messages = JSON.parse(res.text);
        next(receiveMessages(messages));
      });
      break;
    case 'SELECT_MESSAGE':
      const message = { ...action.selectedMessage, read_at: new Date() };
      const message_uuid = action.selectedMessage.uuid;
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
      break;
    default:
      break;
  }
};
