// 库存接口
import axiosInstance from '../axios';

export const getInventory = async () => {
  return axiosInstance.get('/inventory');
};

export const updateInventory = async (id: string, data: any) => {
  return axiosInstance.put(`/inventory/${id}`, data);
};
