// 异步请求相关运行时配置

import {message} from 'antd';

export const request = {
  requestInterceptors: [
        // 直接写一个 function，作为拦截器
        (url, options) =>
        {
          console.log('请求拦截了', url)
          options.url = 'https://iilputaw.lc-cn-n1-shared.com/1.1'+ url
          options.headers = {
            "Content-Type":"application/json",
            "X-LC-Id": "iIlPutAW2Qz4jgOPBfJJwdGA-gzGzoHsz",
            "X-LC-Key": "4kc6wILYKe1hL7A0plsaSQCa" 
          }
          return options
        },
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    async(response, options) =>
      {
        let res = await response.json();
        if(res.objectId && options.method.toLowerCase() === 'post'){
          console.log('新增成功');
          message.success('新增接口请求成功');
        }
        // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
        // do something
        return {data:res.results}
      },
  ]
};
