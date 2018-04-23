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
        }
      ]
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/components/Login.vue')), 'Login')
    },
    {
      path: '/about',
      component: r => require.ensure([], () => r(require('@/components/About.vue')), 'About'),
      // 不需要登录验证
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

router.beforeEach(ceptors.loginInterceptor)
router.beforeEach(ceptors.permInterceptor)

export default router
