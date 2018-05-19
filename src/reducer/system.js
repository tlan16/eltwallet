const defaultState = {
  callToActionDismissed: false,
};
const systemReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CALL_TO_ACTION_DISMISSED':
      return {
        ...state,
        callToActionDismissed: true,
      };
    case 'SET_PIN_CODE':
      return {
        ...state,
        pinCode: action.pinCode,
      };
    default:
      return state;
  }
};

export default systemReducer;
export const getCallToActionDismissed = state => state.callToActionDismissed;
export const getPinCode = state => state.pinCode;
