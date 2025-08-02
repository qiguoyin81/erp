// 订单卡片
import React from 'react';
import { Card, Tag, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

interface OrderCardProps {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ id, customer, amount, status, date }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'processing';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };
  
  return (
    <Card 
      title={<Space><FileTextOutlined /> 订单 #{id}</Space>} 
      extra={<Tag color={getStatusColor(status)}>{status}</Tag>}
    >
      <p><strong>客户:</strong> {customer}</p>
      <p><strong>金额:</strong> ¥{amount.toFixed(2)}</p>
      <p><strong>日期:</strong> {date}</p>
    </Card>
  );
};

export default OrderCard;
