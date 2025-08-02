// ERP专用校验规则
export const validatePhone = (rule: any, value: string) => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (value && !phoneRegex.test(value)) {
    return Promise.reject('请输入正确的手机号码');
  }
  return Promise.resolve();
};

export const validateEmail = (rule: any, value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailRegex.test(value)) {
    return Promise.reject('请输入正确的邮箱地址');
  }
  return Promise.resolve();
};

export const validateIdCard = (rule: any, value: string) => {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (value && !idCardRegex.test(value)) {
    return Promise.reject('请输入正确的身份证号码');
  }
  return Promise.resolve();
};
