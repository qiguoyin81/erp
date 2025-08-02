// 仪表盘数据聚合
import React from 'react';
import { Row, Col, Statistic, Card, Space } from 'antd';
import { 
  ShoppingCartOutlined, 
  DollarOutlined, 
  UserOutlined, 
  RiseOutlined 
} from '@ant-design/icons';

const DashboardContainer: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总订单数"
                value={1265}
                prefix={<ShoppingCartOutlined />}
                suffix={<RiseOutlined style={{ color: '#3f8600' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总收入"
                value={245680}
                precision={2}
                prefix="¥"
                suffix={<RiseOutlined style={{ color: '#3f8600' }} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="用户数"
                value={892}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="转化率"
                value={4.8}
                precision={1}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        
        <Card title="最近订单">
          <p>订单列表内容...</p>
        </Card>
      </Space>
    </div>
  );
};

export default DashboardContainer;
