import { defaultTokens } from '../utils/constants';
import AnalyticsUtils from '../utils/analytics';

const defaultState = {
  availableTokens: defaultTokens,
  selectedToken: defaultTokens[0],
  network: 'mainnet',
};

const walletReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TOKEN':
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
    case 'DELETE_TOKEN':
      return {
        ...state,
        availableTokens: state.availableTokens.filter(
          token => token.id !== action.token.id,
        ),
        selectedToken: state.availableTokens[0],
      };
    case 'RESET_TOKENS':
      return {
        ...state,
        availableTokens: state.availableTokens.filter(
          token => token.name === 'Ethereum',
        ),
        selectedToken: state.availableTokens.filter(
          token => token.name === 'Ethereum',
        )[0],
      };

    case 'SET_DEFAULT_TOKEN':
      return {
        ...state,
        selectedToken: action.token,
      };
    case 'SET_NETWORK':
      AnalyticsUtils.trackEvent('Set network', {
        network: action.network,
      });

      return {
        ...state,
        network: action.network,
      };

    case 'SET_PRIVATE_KEY':
      return {
        ...state,
        privateKey: action.privateKey,
      };
    case 'SET_WALLET_ADDRESS':
      return {
        ...state,
        walletAddress: action.walletAddress,
      };
    default:
      return state;
  }
};

export default walletReducer;
export const getAvailableTokens = state => state.availableTokens;
export const getSelectedToken = state => state.selectedToken;
export const getNetwork = state => state.network;
export const getPrivateKey = state => state.privateKey;
export const getWalletAddress = state => state.walletAddress;
