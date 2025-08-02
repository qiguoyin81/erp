// 审批流程子页
import React from 'react';
import { PageHeader, Steps } from 'antd';
import { CheckCircleOutlined, UserOutlined, SolutionOutlined, LoadingOutlined } from '@ant-design/icons';

const { Step } = Steps;

const ApprovalFlow: React.FC = () => {
  return (
    <div className="approval-flow-page">
      <PageHeader
        title="审批流程"
        breadcrumb={{
          routes: [
            { path: '/', breadcrumbName: '首页' },
            { path: '/procurement', breadcrumbName: '采购管理' },
            { path: '', breadcrumbName: '审批流程' }
          ]
        }}
      />
      
      <div style={{ padding: 24, background: '#fff' }}>
        <Steps
          direction="vertical"
          size="small"
          current={1}
          items={[
            {
              title: '提交申请',
              description: '申请人：张三',
              icon: <UserOutlined />,
            },
            {
              title: '部门审批',
              description: '审批人：李四 (财务部)',
              icon: <SolutionOutlined />,
              subTitle: '进行中'
            },
            {
              title: '财务审批',
              description: '审批人：王五 (财务总监)',
              icon: <DollarOutlined />,
            },
            {
              title: '完成',
              description: '审批完成',
              icon: <CheckCircleOutlined />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ApprovalFlow;
