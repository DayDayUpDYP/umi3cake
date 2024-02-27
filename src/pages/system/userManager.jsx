import React, { useEffect } from 'react';
import { Form, Input, Button, Spin, Select } from 'antd';
import { useRequest } from 'umi';
import { roleGet, userReg } from '@/api/user';
const { Option } = Select;

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

const userManager = () => {
  const [form] = Form.useForm();
  let { data: roleList, loading: roleLoading } = useRequest(roleGet);

  let { data, loading, run } = useRequest(
    (value) => {
      return userReg(value);
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
          name="username"
          label="账号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Spin spinning={roleLoading}>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            {/* 循环角色列表 */}
            <Select placeholder="请选择账号角色">
              {roleList?.map((item) => {
                return (
                  <Option value={item.rolecode} key={item.objectId}>
                    {item.rolename}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Spin>
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

export default userManager;
