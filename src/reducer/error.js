const defaultState = {
  errorMessage: '',
};
const errorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FAIL_TO_RECEIVE':
      return {
        ...state,
        errorMessage: 'Fail to receive message',
      };
    case 'SEND_MESSAGE_FAIL':
      return {
        ...state,
        errorMessage: 'Fail to send message',
      };
    case 'FAIL_TO_SET_PROFILE':
      return {
        ...state,
        errorMessage: 'Fail to set profile',
      };
    default:
      return state;
  }
};
export default errorReducer;
export const getErrorMessage = state => state.errorMessage;
