import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import ThresholdEventRuleDetailPanel from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
      <ThresholdEventRuleDetailPanel />
    </ConfigProvider>
  </React.StrictMode>
);
