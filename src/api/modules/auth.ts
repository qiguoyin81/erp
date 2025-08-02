// 认证接口
import axiosInstance from '../axios';

export const login = async (username: string, password: string) => {
  return axiosInstance.post('/auth/login', { username, password });
};

export const logout = async () => {
  return axiosInstance.post('/auth/logout');
};
