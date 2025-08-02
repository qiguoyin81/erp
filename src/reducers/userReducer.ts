// 用户状态处理
import { UserActionTypes, USER_LOGIN, USER_LOGOUT } from '../actions/userActions';

export interface UserState {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: null,
  token: null,
  isAuthenticated: false
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        isAuthenticated: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        username: null,
        token: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;
