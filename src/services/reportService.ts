// 报表生成服务
export const generateSalesReport = async (params: any) => {
  // 模拟生成销售报表
  console.log('生成销售报表:', params);
  return Promise.resolve({
    data: {
      reportId: 'report_12345',
      url: '/reports/sales_2023.pdf'
    }
  });
};

export const generateInventoryReport = async (params: any) => {
  // 模拟生成库存报表
  console.log('生成库存报表:', params);
  return Promise.resolve({
    data: {
      reportId: 'report_67890',
      url: '/reports/inventory_2023.pdf'
    }
  });
};
