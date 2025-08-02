// 请求实例配置
const axiosInstance = {
  get: (url: string) => Promise.resolve({ data: {} }),
  post: (url: string, data: any) => Promise.resolve({ data }),
  put: (url: string, data: any) => Promise.resolve({ data }),
  delete: (url: string) => Promise.resolve({ data: {} })
};

export default axiosInstance;
