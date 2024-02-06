import React from 'react'
import {cateAdd} from '@/api/cake'
import { Form, Input, Button,Spin } from 'antd';
import {useRequest} from 'umi'
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

const CatePub = () => {
  const [form] = Form.useForm();
  let {data,loading,run} = useRequest((value)=>{
    console.log('useRequest执行了',value);
    return cateAdd(value)
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

  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="catename"
          label="分类名称"
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

export default CatePub;



