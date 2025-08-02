import React from 'react';
import { Layout, Menu, Typography, Space } from 'antd';
import { 
  HomeOutlined, 
  ShoppingCartOutlined, 
  FileTextOutlined, 
  DollarOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './App.less';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {
  return (
    <Layout className="erp-layout">
      <Sider className="erp-sider" width={240}>
        <div className="erp-logo">
          <Title level={4} style={{ color: '#fff', margin: '16px 0' }}>
            ERP管理系统
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: '仪表盘',
            },
            {
              key: '2',
              icon: <ShoppingCartOutlined />,
              label: '采购管理',
            },
            {
              key: '3',
              icon: <FileTextOutlined />,
              label: '订单管理',
            },
            {
              key: '4',
              icon: <DollarOutlined />,
              label: '财务管理',
            },
            {
              key: '5',
              icon: <UserOutlined />,
              label: '用户管理',
            },
            {
              key: '6',
              icon: <SettingOutlined />,
              label: '系统设置',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="erp-header">
          <Space>
            <UserOutlined style={{ fontSize: '20px', color: '#fff' }} />
            <span style={{ color: '#fff' }}>管理员</span>
          </Space>
        </Header>
        <Content className="erp-content">
          <div className="erp-dashboard">
            <Title level={2}>欢迎使用ERP管理系统</Title>
            <p>请选择左侧菜单开始操作</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
