// 异步请求相关运行时配置

import { message } from 'antd';
import './utils/init-leancloud-sdk'; //初始化 leancloud 文件上传服务
import { history } from 'umi';
import HeaderDropMenu from './components/HeaderDropMenu';
export const request = {
  requestInterceptors: [
    // 直接写一个 function，作为拦截器
    (url, options) => {
      console.log('请求拦截了', url);
      options.url = 'https://iilputaw.lc-cn-n1-shared.com/1.1' + url;
      options.headers = {
        'Content-Type': 'application/json',
        'X-LC-Id': 'iIlPutAW2Qz4jgOPBfJJwdGA-gzGzoHsz',
        'X-LC-Key': '4kc6wILYKe1hL7A0plsaSQCa',
      };
      return options;
    },
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    async (response, options) => {
      let res = await response.json();
      if (res.objectId) {
        let method = options.method.toLowerCase();
        if (method === 'post' && res.sessionToken) {
          let msg =
            options.url.indexOf('login') === -1 ? '账号分配成功' : '登录成功';
          message.success(msg);
        } else {
          let msg = method === 'post' ? '新增成功' : '修改成功';
          message.success(msg);
        }
      }
      // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
      // do something
      let { results } = res;
      let data = results ? results : res;
      return { data };
    },
  ],
};

// 设置后可以不到登录页 直接登录网站 返回值将成为全局初始状态
export async function getInitialState() {
  let userState = {
    isLogin: false,
    userInfo: null,
  };
  let info =
    localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
  if (info) {
    userState = {
      isLogin: true,
      userInfo: JSON.parse(info),
    };
  }
  return userState;
}

// layout 的运行时配置
export const layout = ({ initialState }) => {
  return {
    onPageChange: () => {
      const { isLogin } = initialState;
      if (!isLogin) {
        history.push('/login');
      }
    },
    // 渲染头部右侧个人信息修改和退出
    rightContentRender: () => <HeaderDropMenu />,
  };
};
