// 公开路由
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContainer from '../containers/AuthContainer';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthContainer />} />
    </Routes>
  );
};

export default PublicRoutes;
