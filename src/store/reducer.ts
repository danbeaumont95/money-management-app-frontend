import * as Types from './types';


const initialState = {
  accessToken: '',
  refreshToken: '',
  loggedInUser: '',
  plaidAccessToken: '',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.UPDATE_ACCESSTOKEN:
      return { ...state, accessToken: action.payload.accessToken };
      case Types.UPDATE_REFRESHTOKEN:
        return { ...state, refreshToken: action.payload.refreshToken };
    case Types.UPDATE_LOGGED_IN_USER:
      return { ...state, loggedInUser: action.payload.loggedInUser };
    case Types.UPDATE_PLAID_ACCESS_TOKEN:
      return { ...state, plaidAccessToken: action.payload.plaidAccessToken };
    default: return state;
  }
}

export { reducer };
