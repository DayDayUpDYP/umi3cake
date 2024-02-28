import { Form, Input, Button, Checkbox, Card, Row, Col, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useModel, history, useRequest } from 'umi';
import { userLogin } from '@/api/user';
const Login = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  let [remember, setRemember] = useState(false);
  // 使用 useRequest的 hook
  let { data, loading, run } = useRequest(userLogin, {
    manual: true,
  });
  console.log(data, loading);
  const onFinish = (values) => {
    console.log('Success:', values);
    run(values);
    setRemember(values.remember);
    // 修改全局的initialState，让layout有机会进入主面板
    // setInitialState({
    //   isLogin:true,
    //   userInfo:values
    // })
    // // 触发路由切换至 /
    // setTimeout(()=>{
    //   history.push('/')
    // },1000)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // 检测 data 的变化
  useEffect(() => {
    if (data) {
      // 是否记住密码
      if (remember) {
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        sessionStorage.setItem('userInfo', JSON.stringify(data));
      }
      setInitialState({
        //更新本地initailState，重新触发layout路由判断
        isLogin: true,
        userInfo: data,
      });
      // 触发路由切换至 /
      setTimeout(() => {
        history.push('/');
      }, 200);
    }
  }, [data]);

  let initData = {
    username: 'root',
    password: 'root',
    remember,
  };

  return (
    <Row align="middle" style={{ height: '100vh', background: '#f6f6f6' }}>
      <Col span={8} offset={8}>
        <Spin spinning={loading}>
          <Card title="请登录" extra={<a href="#">去注册</a>}>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={initData}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Spin>
      </Col>
    </Row>
  );
};

export default Login;
