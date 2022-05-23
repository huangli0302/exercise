import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {//实现的路由懒加载
    loading: '@/components/Loading',
  },
  routes: [
    { 
      path: '/', 
      redirect:'/index'
    },
    {
      path: '/index', 
      component: '@/pages/index',
      //redirect:'/index/list',
      wrappers: [
        '@/wrappers/auth',
      ],
      routes:[
        { 
        path: '/index/list', 
        component: '@/pages/list/List',
        //exact: true,
      },  
    ]
    },
    {
      path:'/login',
      component:'@/pages/login/Login',
    },
    { component: '@/pages/404' },
  ],
  fastRefresh: {},
  history: {
      type: 'hash'
  },
  dva:{},
  proxy: {
    '/api': {
      'target': 'http://localhost:3004',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});
