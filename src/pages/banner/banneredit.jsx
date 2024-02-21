import React, { useEffect } from 'react';
import { bannerUpdate } from '@/api/banner';
import { Form, Input, Button, Spin } from 'antd';
import { useRequest, history } from 'umi';
import ImageUpload from '../../components/imgUpload';
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

const BannerEdit = (props) => {
  const [form] = Form.useForm();
  let query = props.location.query;
  let { data, loading, run } = useRequest(
    (value) => {
      return bannerUpdate(query.objectId, value);
    },
    { manual: true },
  ); //开启手动执行

  const onFinish = (values) => {
    run(values); //手动执行useRequest
  };

  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    //进入时候获取数据
    form.setFieldsValue(query);
  }, []);
  useEffect(() => {
    // 更新成功后返回列表页
    if (data) {
      history.push({
        pathname: '/banner/bannerlist',
      });
    }
  }, [data]);
  let initData = {
    bannerName: '龙年活动',
    bannerUrl:
      'https://pic4.zhimg.com/v2-1ba65b515b7227730fa3ec5340762f77_r.jpg',
  };
  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        initialValues={initData}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="bannerName"
          label="轮播名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bannerUrl"
          label="轮播地址"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bannerimgUrl"
          label="轮播图片地址"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUpload />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            编辑完成
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default BannerEdit;
