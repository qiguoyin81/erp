// 接口类型定义
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}
