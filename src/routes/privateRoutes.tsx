// 需鉴权路由
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardContainer from '../containers/DashboardContainer';
import CreateOrder from '../pages/Procurement/CreateOrder';
import ApprovalFlow from '../pages/Procurement/ApprovalFlow';

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardContainer />} />
      <Route path="/procurement/create" element={<CreateOrder />} />
      <Route path="/procurement/approval" element={<ApprovalFlow />} />
    </Routes>
  );
};

export default PrivateRoutes;
