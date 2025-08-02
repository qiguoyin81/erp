// 认证服务
import { login as loginApi, logout as logoutApi } from '../api/modules/auth';
import { userLogin, userLogout } from '../actions/userActions';
import type { AppDispatch } from '../store/configureStore';

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await loginApi(username, password);
    const { token, user } = response.data;
    dispatch(userLogin(user.username, token));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await logoutApi();
    dispatch(userLogout());
    return { success: true };
  } catch (error) {
    dispatch(userLogout()); // 即使API失败也清除本地状态
    return { success: false, error };
  }
};
