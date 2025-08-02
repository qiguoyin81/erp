// 用户相关操作
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export interface UserLoginAction {
  type: typeof USER_LOGIN;
  payload: {
    username: string;
    token: string;
  };
}

export interface UserLogoutAction {
  type: typeof USER_LOGOUT;
}

export type UserActionTypes = UserLoginAction | UserLogoutAction;

export const userLogin = (username: string, token: string): UserLoginAction => ({
  type: USER_LOGIN,
  payload: { username, token }
});

export const userLogout = (): UserLogoutAction => ({
  type: USER_LOGOUT
});
