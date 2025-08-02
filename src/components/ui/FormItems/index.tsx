// 表单控件集
import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';

export const AppInput = (props: any) => {
  return <Input {...props} />;
};

export const AppSelect = (props: any) => {
  return <Select {...props} />;
};

export const AppDatePicker = (props: any) => {
  return <DatePicker {...props} />;
};

export const AppForm = (props: any) => {
  return <Form {...props} />;
};
