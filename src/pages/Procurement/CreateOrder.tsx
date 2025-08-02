// 新建订单页
import React from 'react';
import { Form, Input, Button, Card, Space, message } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { AppForm, AppInput } from '../../components/ui/FormItems';
import useERPForm from '../../hooks/useERPForm';

interface OrderFormValues {
  customer: string;
  product: string;
  quantity: number;
  price: number;
}

const CreateOrder: React.FC = () => {
  const { form, submitting, handleSubmit } = useERPForm<OrderFormValues>();
  
  const onSubmit = async (values: OrderFormValues) => {
    console.log('提交订单:', values);
    message.success('订单创建成功');
    form.resetFields();
  };
  
  return (
    <div className="create-order-page">
      <PageHeader
        title="新建采购订单"
        breadcrumb={{
          routes: [
            { path: '/', breadcrumbName: '首页' },
            { path: '/procurement', breadcrumbName: '采购管理' },
            { path: '', breadcrumbName: '新建订单' }
          ]
        }}
      />
      
      <Card>
        <AppForm
          form={form}
          layout="vertical"
          onFinish={() => handleSubmit(onSubmit)}
        >
          <Form.Item
            name="customer"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <AppInput placeholder="请输入客户名称" />
          </Form.Item>
          
          <Form.Item
            name="product"
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <AppInput placeholder="请输入商品名称" />
          </Form.Item>
          
          <Form.Item
            name="quantity"
            label="数量"
            rules={[{ required: true, message: '请输入数量' }]}
          >
            <Input type="number" placeholder="请输入数量" />
          </Form.Item>
          
          <Form.Item
            name="price"
            label="单价"
            rules={[{ required: true, message: '请输入单价' }]}
          >
            <Input type="number" placeholder="请输入单价" addonAfter="元" />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交订单
              </Button>
              <Button htmlType="button" onClick={() => form.resetFields()}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </AppForm>
      </Card>
    </div>
  );
};

export default CreateOrder;
