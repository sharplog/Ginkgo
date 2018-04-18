import Vue from 'vue'
import Router from 'vue-router'
import Config from '../config.js'

declare let require

Vue.use(Router)

const config = Config
const loginURL = '/login'
const homeURL = '/'

let router: Router = new Router({
  // 地址栏中不会出现字符 '#'
  mode: 'history',
  routes: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('@/components/Business.vue')), 'Business'),
      children: [
        {
          path: '',
          component: r => require.ensure([], () => r(require('@/components/Home.vue')), 'Home')
        },
        {
          path: 'profile',
          component: r => require.ensure([], () => r(require('@/components/Profile.vue')), 'Profile')
        },
        {
          path: 'message',
          component: r => require.ensure([], () => r(require('@/components/Message.vue')), 'Message')
        }
      ]
    },
    {
      path: loginURL,
      component: r => require.ensure([], () => r(require('@/components/Login.vue')), 'Login')
    }
  ]
})

// 登录验证
router.beforeEach((to, from, next) => {
  if (to.path === loginURL) {
    if (sessionStorage.getItem('accessToken')) {
      next({ path: homeURL })
    } else {
      next()
    }
  } else {
    if (sessionStorage.getItem('accessToken') ||
      // 两种避免验证的方式
      to.meta.needAuth === false || config.whiteList.test(to.path)) {
      debugger
      next()
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
