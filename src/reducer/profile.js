const defaultState = {
  email: '',
  nickname: '',
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_PROFILE':
      return {
        ...state,
        email: action.email,
        nickname: action.nickname,
      };
    default:
      return state;
  }
};
export default profileReducer;
export const getEmail = state => state.email;
export const getNickname = state => state.nickname;
