export default [
    { 
      path: '/', 
      component: '@/pages/index',
      name:'首页' 
    },
    { 
      path: '/test', 
      component: '@/pages/test/index',
      name:'测试' 
    },
    {
      path:'/cate',
      name:'分类管理',
      routes:[
        {
          path:'/cate/list',
          component:'@/pages/category/catelist',
          name:'分类列表'
        },{
          path:'/cate/pub',
          component:'@/pages/category/catepub',
          name:'分类发布'
        }
      ]
    }
  ]