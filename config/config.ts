import { defineConfig } from 'umi';
import routes from './routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 配置开启antdui框架
  antd: {
    dark: false,
  },
  // 开启项目页面骨架
  layout: {
    name: 'ant desgin',
    locale: true,
    layout: 'side',
  },
  dva: {
    immer: false, // 启用immer以方便修改reducer
    hmr: false, // 热更新
  },
  // route 单独放一个文件夹
  routes,
  fastRefresh: {},
  externals: { AMap: 'window.AMap' },
});
