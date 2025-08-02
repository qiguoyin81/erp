import React from 'react';
import { Layout, Row, Col, Typography, Button } from 'antd';
import { 
  MessageOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  ForkOutlined,
  ToolOutlined,
  BarcodeOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TopUserInfo from './components/ui/TopUserInfo';
import ManufacturingPage from './pages/Manufacturing';
import './App.less';

const { Header, Content } = Layout;
const { Title } = Typography;

// 定义图标组件
const IconCard = ({ icon, title, to }) => {
  const { t } = useTranslation();
  return (
    <Col span={4} style={{ textAlign: 'center' }}>
      <Link to={to} style={{ color: 'inherit', textDecoration: 'none' }}>
        <div style={{ 
          width: '60px', 
          height: '60px', 
          background: '#fff', 
          margin: 'auto', 
          borderRadius: '8px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {icon}
        </div>
        <Title level={5} style={{ marginTop: '8px', marginBottom: '0' }}>{t(title)}</Title>
      </Link>
    </Col>
  );
};

const App = () => {
  const { t, i18n } = useTranslation();
  
  // 切换语言
  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ padding: '0 20px', background: '#f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{t('companyName')}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button onClick={toggleLanguage} style={{ marginRight: '10px' }}>
                  {i18n.language === 'zh' ? 'EN' : '中文'}
                </Button>
                {/* 使用公共的顶部用户信息组件 */}
                <TopUserInfo />
              </div>
            </Header>
            <Content style={{ background: 'linear-gradient(135deg, #f0f2f5 0%, #ffffff 100%)', padding: '50px' }}>
              <Row gutter={[16, 16]}>
                <IconCard icon={<MessageOutlined style={{ fontSize: '24px', color: '#1890ff' }} />} title="discuss" to="/discussion" />
                <IconCard icon={<DashboardOutlined style={{ fontSize: '24px', color: '#52c41a' }} />} title="dashboard" to="/dashboard" />
                <IconCard icon={<DatabaseOutlined style={{ fontSize: '24px', color: '#722ed1' }} />} title="inventory" to="/inventory" />
                <IconCard icon={<ForkOutlined style={{ fontSize: '24px', color: '#13c2c2' }} />} title="manufacturing" to="/manufacturing" />
                <IconCard icon={<ToolOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />} title="workshop" to="/workshop" />
                <IconCard icon={<BarcodeOutlined style={{ fontSize: '24px', color: '#eb2f96' }} />} title="barcode" to="/barcode" />
                <IconCard icon={<TeamOutlined style={{ fontSize: '24px', color: '#fadb14' }} />} title="employee" to="/employee" />
                <IconCard icon={<AppstoreOutlined style={{ fontSize: '24px', color: '#fa541c' }} />} title="application" to="/application" />
                <IconCard icon={<SettingOutlined style={{ fontSize: '24px', color: '#13c2c2' }} />} title="settings" to="/settings" />
              </Row>
            </Content>
          </Layout>
        } />
        <Route path="/manufacturing/*" element={<ManufacturingPage />} />
      </Routes>
    </Router>
  );
};

export default App;