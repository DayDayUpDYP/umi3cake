import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { useRequest } from 'umi';
import { roleAdd } from '@/api/user';
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const roleManager = () => {
  const [form] = Form.useForm();
  let { data, loading, run } = useRequest(
    (value) => {
      return roleAdd(value);
    },
    { manual: true },
  ); //开启手动执行

  const onFinish = (values) => {
    run(values); //手动执行useRequest
    form.resetFields();
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="rolename"
          label="角色名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rolecode"
          label="角色代号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default roleManager;
