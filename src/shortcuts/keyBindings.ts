// 快捷键配置
export const KEY_BINDINGS = {
  CREATE_ORDER: {
    key: 'ctrl+o',
    description: '新建订单'
  },
  SEARCH: {
    key: 'ctrl+f',
    description: '搜索'
  },
  REFRESH: {
    key: 'f5',
    description: '刷新页面'
  }
};

export const setupKeyBindings = () => {
  // 快捷键绑定逻辑
  console.log('快捷键已绑定');
};
