import { combineReducers } from 'redux';
import walletReducer from './wallet';
import systemReducer from './system';
import messageReducer from './message';
import profileReducer from './profile';
import { defaultTokens } from '../utils/constants';

const appReducer = combineReducers({
  wallet: walletReducer,
  system: systemReducer,
  message: messageReducer,
  profile: profileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default appReducer;
export const getWallet = state => state.wallet;
export const getSystem = state => state.system;
export const getMessage = state => state.message;
export const getProfile = state => state.profile;
export const defaultState = {
  wallet: {
    availableTokens: defaultTokens,
    selectedToken: defaultTokens[0],
    network: 'mainnet',
  },
  message: {
    messages: [],
    selectedMessage: null,
    isSendingMessage: false,
    unreadMessageCount: 0,
  },
  system: {
    callToActionDismissed: false,
  },
};
