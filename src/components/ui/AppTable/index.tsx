// ERP专用表格
import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface AppTableProps<T> extends TableProps<T> {
  // 自定义属性
}

const AppTable = <T extends object>(props: AppTableProps<T>) => {
  return <Table {...props} />;
};

export default AppTable;
