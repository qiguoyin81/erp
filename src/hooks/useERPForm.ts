// 表单增强Hook
import { Form } from 'antd';
import { useState } from 'react';

const useERPForm = <T extends object>() => {
  const [form] = Form.useForm<T>();
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (onSubmit: (values: T) => Promise<void>) => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      await onSubmit(values);
    } catch (error) {
      console.error('表单验证失败:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return {
    form,
    submitting,
    handleSubmit
  };
};

export default useERPForm;
