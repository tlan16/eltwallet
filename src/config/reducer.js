import uuid from 'react-native-uuid';
import {
  ADD_TOKEN,
  DELETE_TOKEN,
  LOGOUT,
  RESET_TOKENS,
  SET_CALL_TO_ACTION_DISMISSED,
  SET_DEFAULT_TOKEN,
  SET_NETWORK,
  SET_PIN_CODE,
  SET_PRIVATE_KEY,
  SET_WALLET_ADDRESS,
  SELECT_MESSAGE,
} from './actionTypes';
import { defaultTokens } from '../utils/constants';
import AnalyticsUtils from '../utils/analytics';

const defaultmessages = [
  {
    uuid: '0',
    sender_address: '0x12345               ',
    title: 'title0',
    body: 'here is some body content 0',
    updatedAt: '2018-05-07T06:25:36.629Z',
    createdAt: '2018-05-07T06:25:36.629Z',
    recipients: [
      {
        address: '0x22222',
      },
      {
        address: '0x33333',
      },
    ],
  },
  {
    uuid: '1',
    sender_address: '0x12345               ',
    title: 'title1',
    body: 'here is some body content 1',
    updatedAt: '2018-03-07T08:25:36.629Z',
    createdAt: '2018-03-07T08:25:36.629Z',
    recipients: [
      {
        address: '0x22222',
      },
      {
        address: '0x33333',
      },
    ],
  },
];

const defaultState = {
  availableTokens: defaultTokens,
  callToActionDismissed: false,
  selectedToken: defaultTokens[0],
  network: 'mainnet',
  messages: [],
  selectedMessage: null,
  isSendingMessage: false,
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      AnalyticsUtils.trackEvent('Add custom token', {
        contractAddress: action.token.contractAddress,
        decimals: action.token.decimals,
        name: action.token.name,
        symbol: action.token.symbol,
      });

      return {
        ...state,
        availableTokens: state.availableTokens.concat([
          Object.assign(
            action.token,
            { id: uuid.v4() },
            action.token.name === 'ELTCOIN'
              ? {
                  symbol: 'ELT',
                }
              : {},
          ),
        ]),
      };
    case DELETE_TOKEN:
      return {
        ...state,
        availableTokens: state.availableTokens.filter(
          token => token.id !== action.token.id,
        ),
        selectedToken: state.availableTokens[0],
      };
    case RESET_TOKENS:
      return {
        ...state,
        availableTokens: state.availableTokens.filter(
          token => token.name === 'Ethereum',
        ),
        selectedToken: state.availableTokens.filter(
          token => token.name === 'Ethereum',
        )[0],
      };
    case SET_CALL_TO_ACTION_DISMISSED:
      return {
        ...state,
        callToActionDismissed: true,
      };
    case SET_DEFAULT_TOKEN:
      return {
        ...state,
        selectedToken: action.token,
      };
    case SET_NETWORK:
      AnalyticsUtils.trackEvent('Set network', {
        network: action.network,
      });

      return {
        ...state,
        network: action.network,
      };
    case SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.pinCode,
      };
    case SET_PRIVATE_KEY:
      return {
        ...state,
        privateKey: action.privateKey,
      };
    case SET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    case SELECT_MESSAGE:
      return {
        ...state,
        selectedMessage: action.selectedMessage,
      };
    case 'FETCH_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: action.messages,
      };
    case 'SEND_MESSAGE_SUCCESS':
      console.log('!!!!!!!!!');
      return {
        ...state,
        isSendingMessage: false,
      };
    case 'SEND_MESSAGE_START':
      console.log('%%%%%%%%%');
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

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

export { defaultState, rootReducer };
