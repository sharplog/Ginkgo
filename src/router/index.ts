import Vue from 'vue'
import Router from 'vue-router'
import * as ceptors from './interceptors'

declare let require

Vue.use(Router)

let router: Router = new Router({
  // 地址栏中不会出现字符 '#'
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: '首页',
      component: r => require.ensure([], () => r(require('@/components/Business.vue')), 'Business'),
      children: [
        {
          path: 'home',
          name: '',
          component: r => require.ensure([], () => r(require('@/components/Home.vue')), 'Home')
        },
        {
          path: 'profile',
          name: '个人信息',
          component: r => require.ensure([], () => r(require('@/components/Profile.vue')), 'Profile')
        },
        {
          path: 'message',
          name: '消息通知',
          component: r => require.ensure([], () => r(require('@/components/Message.vue')), 'Message')
        },
        {
          path: 'demo/map',
          name: '地图示例',
          component: r => require.ensure([], () => r(require('@/components/Demo/Map.vue')), 'Demo-Map')
        },
        {
          path: 'demo/indoor',
          name: '室内图示例',
          component: r => require.ensure([], () => r(require('@/components/Demo/Indoor.vue')), 'Demo-Indoor')
        },
        {
          path: 'demo/chart',
          name: '图表示例',
          component: r => require.ensure([], () => r(require('@/components/Demo/Chart.vue')), 'Demo-Chart')
        }
      ]
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/components/Login.vue')), 'Login'),
      // 不需要登录验证
      meta: { needAuth: false }
    },
    {
      path: '/logout',
      component: r => require.ensure([], () => r(require('@/components/Logout.vue')), 'Logout'),
      meta: { needAuth: false }
    },
    {
      path: '/about',
      component: r => require.ensure([], () => r(require('@/components/About.vue')), 'About'),
      meta: { needAuth: false }
    },
    {
      path: '/no-permission',
      name: '没有权限',
      component: r => require.ensure([], () => r(require('@/components/NoPermission.vue')), 'NoPermission'),
      meta: { needAuth: false }
    }
  ]
})

// 加载before拦截器
for (let ceptor in ceptors.before) {
  router.beforeEach(ceptors.before[ceptor])
}

// 加载after拦截器
for (let ceptor in ceptors.after) {
  router.afterEach(ceptors.after[ceptor])
}

export default router
