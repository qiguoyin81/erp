// 库存筛选器
import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

interface InventoryFilterProps {
  onFilter: (values: any) => void;
  onReset: () => void;
}

const InventoryFilter: React.FC<InventoryFilterProps> = ({ onFilter, onReset }) => {
  const [form] = Form.useForm();
  
  const handleFinish = (values: any) => {
    onFilter(values);
  };
  
  const handleReset = () => {
    form.resetFields();
    onReset();
  };
  
  return (
    <Form form={form} layout="inline" onFinish={handleFinish}>
      <Form.Item name="name" label="商品名称">
        <Input placeholder="请输入商品名称" />
      </Form.Item>
      
      <Form.Item name="category" label="分类">
        <Select placeholder="请选择分类" style={{ width: 120 }}>
          <Option value="electronics">电子产品</Option>
          <Option value="clothing">服装</Option>
          <Option value="food">食品</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="status" label="状态">
        <Select placeholder="请选择状态" style={{ width: 120 }}>
          <Option value="in_stock">有库存</Option>
          <Option value="low_stock">库存不足</Option>
          <Option value="out_of_stock">缺货</Option>
        </Select>
      </Form.Item>
      
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button htmlType="button" onClick={handleReset} icon={<ReloadOutlined />}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default InventoryFilter;
