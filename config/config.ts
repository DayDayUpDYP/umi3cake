import { defineConfig } from 'umi';
import routes from './routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 配置开启antdui框架
  antd:{
    dark:false
  },
  // 开启项目页面骨架
  layout:{
    name:'ant desgin',
    locale:true,
    layout:'side',
  },
  // route 单独放一个文件夹
  routes,
  fastRefresh: {},
});
