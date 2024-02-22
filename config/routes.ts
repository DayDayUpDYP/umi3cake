export default [
  {
    path: '/',
    component: '@/pages/index',
    name: '首页',
    icon: 'AreaChartOutlined',
  },
  {
    path: '/test',
    component: '@/pages/test/index',
    name: '测试',
    icon: 'SettingOutlined',
  },
  {
    path: '/cate',
    name: '分类管理',
    icon: 'WindowsOutlined',
    routes: [
      {
        path: '/cate/list',
        component: '@/pages/category/catelist',
        name: '分类列表',
      },
      {
        path: '/cate/pub',
        component: '@/pages/category/catepub',
        name: '分类发布',
      },
    ],
  },
  {
    path: '/banner',
    name: '轮播管理',
    icon: 'SmileOutlined',
    routes: [
      {
        path: '/banner/bannerlist',
        component: '@/pages/banner/bannerlist',
        name: '轮播列表',
      },
      {
        path: '/banner/bannerpub',
        component: '@/pages/banner/bannerpub',
        name: '轮播发布',
      },
      {
        path: '/banner/banneredit',
        component: '@/pages/banner/banneredit',
        name: '轮播编辑',
        hideInMenu: true, //侧边菜单不显示
      },
    ],
  },
  {
    path: '/goods',
    name: '商品管理',
    icon: 'SmileOutlined',
    routes: [
      {
        path: '/goods/goodslist',
        component: '@/pages/goods/goodslist',
        name: '商品列表',
      },
      {
        path: '/goods/goodspub',
        component: '@/pages/goods/goodspub',
        name: '商品发布',
      },
    ],
  },
];
