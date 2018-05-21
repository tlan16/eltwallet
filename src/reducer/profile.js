const defaultState = {
  email: '',
  nickname: '',
  isSavingProfile: false,
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_PROFILE':
      return {
        ...state,
        email: action.email,
        nickname: action.nickname,
        isSavingProfile: false,
      };
    case 'SET_PROFILE_START':
      return {
        ...state,
        isSavingProfile: true,
      };
    case 'FAIL_TO_SET_PROFILE':
      return {
        ...state,
        isSavingProfile: false,
      };
    default:
      return state;
  }
};
export default profileReducer;
export const getEmail = state => state.email;
export const getNickname = state => state.nickname;
export const getIsSavingProfile = state => state.isSavingProfile;
