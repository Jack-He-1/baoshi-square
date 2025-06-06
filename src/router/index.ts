import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例，===> new VueRouter()
// history 是路由模式，hash模式，history模式
// createWebHistory() 是开启history模块   http://xxx/user
// createWebHashHistory() 是开启hash模式    http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path
// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' // 根路径重定向到登录页
    },
    {
      path: '/login',//登录页
      component: () => import('@/views/LoginModule/Login/LoginIndex.vue')
    },
    {
      path: '/register',//注册页
      component: () => import('@/views/LoginModule/Register/RegisterIndex.vue')
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/home',//兼职工作列表首页
          component: () => import('@/views/WorkModule/home/HomeIndex.vue')
        },
        {
          path: '/my-works',//兼职员工工作台
          component: () => import('@/views/MyWorksModule/myworks/PartTime/MyWorksIndex.vue')
        },
        {
          path: '/wallet',//兼职钱包首页
          component: () => import('@/views/WalletModule/wallet/WalletIndex.vue')
        },
        {
          path: '/incentive',//兼职员工激励首页
          component: () => import('@/views/IncentiveModule/incentive/IncentiveIndex.vue')
        },
        {
          path: '/me',//员工信息首页
          component: () => import('@/views/MeModule/me/PartTime/MeIndex.vue')
        },
        {
          path: '/my-works/full-time',//全职员工工作台
          component: () => import('@/views/MyWorksModule/myworks/FullTime/MyWorksIndex.vue')
        },
        {
          path: '/working-hours',//全职员工工时统计
          component: () => import('@/views/WorkingHoursModule/workinghours/WorkingHoursIndex.vue')
        },
      ]
    },

  ]
})

export default router
