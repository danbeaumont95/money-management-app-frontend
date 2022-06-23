import * as Types from './types';

const initialState = {
  accessToken: '',
  refreshToken: '',
  loggedInUser: '',
  plaidAccessToken: '',
};

// eslint-disable-next-line default-param-last
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
};

// eslint-disable-next-line import/prefer-default-export
export { reducer };
