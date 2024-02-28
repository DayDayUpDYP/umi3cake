export default [
  {
    path: '/login',
    component: '@/pages/login/index',
    name: '登录',
    layout: false,
    hideInMenu: true,
  },
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
    access: 'isAdmin',
    routes: [
      {
        path: '/cate/list',
        component: '@/pages/category/catelist',
        name: '分类列表',
        access: 'isAdmin',
      },
      {
        path: '/cate/pub',
        component: '@/pages/category/catepub',
        name: '分类发布',
        access: 'isRoot',
      },
    ],
  },
  {
    path: '/banner',
    name: '轮播管理',
    icon: 'SmileOutlined',
    access: 'isWorker',
    routes: [
      {
        path: '/banner/bannerlist',
        component: '@/pages/banner/bannerlist',
        name: '轮播列表',
        access: 'isWorker',
      },
      {
        path: '/banner/bannerpub',
        component: '@/pages/banner/bannerpub',
        name: '轮播发布',
        access: 'isAdmin',
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
    access: 'isAdmin',
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
  {
    path: '/system',
    name: '系统设置',
    icon: 'SettingOutlined',
    access: 'isRoot',
    routes: [
      {
        path: '/system/role',
        component: '@/pages/system/roleManager',
        name: '角色管理',
      },
      {
        path: '/system/user',
        component: '@/pages/system/userManager',
        name: '账号管理',
      },
    ],
  },
];
