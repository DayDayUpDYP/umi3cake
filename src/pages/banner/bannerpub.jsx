import React from 'react'
import {bannerAdd} from '@/api/banner'
import { Form, Input, Button,Spin } from 'antd';
import {useRequest} from 'umi'
import ImageUpload from '../../components/imgUpload'
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

const BannerPub = () => {
  const [form] = Form.useForm();
  let {data,loading,run} = useRequest((value)=>{
    console.log('va',value)
    return bannerAdd(value)
  },{manual:true})  //开启手动执行


  const onFinish = (values) => {
    run(values)  //手动执行useRequest
    // console.log(values);
    // cateAdd(values).then(res=>{
    //   console.log(res);
    // })
  };
  const onReset = () => {
    form.resetFields();
  };
  let initData = {
    bannerName:'龙年活动',
    bannerUrl:'https://pic4.zhimg.com/v2-1ba65b515b7227730fa3ec5340762f77_r.jpg',
  }
  return (
    <Spin spinning={loading}>
      <Form {...layout} initialValues={initData} form={form} name="control-hooks" onFinish={onFinish}>
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

export default BannerPub;



