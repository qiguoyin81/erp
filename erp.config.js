// ERP专属配置
module.exports = {
  projectName: 'erp-project',
  version: '1.0.0',
  modules: [
    'procurement',
    'inventory',
    'orders',
    'financial',
    'users'
  ],
  theme: {
    primaryColor: '#1890ff',
    layout: 'side'
  },
  features: {
    enableNotifications: true,
    enableShortcuts: true,
    enableReports: true
  }
};
