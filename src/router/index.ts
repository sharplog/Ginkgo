import Vue from 'vue'
import Router from 'vue-router'
import Config from '../config.js'
import vuex from '../store'

declare let require

Vue.use(Router)

const store = vuex
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
    },
    {
      path: '/about',
      component: r => require.ensure([], () => r(require('@/components/About.vue')), 'About'),
      // 不需要登录验证
      meta: { needAuth: false }
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
      next()
    } else {
      sessionStorage.setItem('beforeLogin', to.path)
      next({ path: loginURL })
    }
  }
})

// 基于菜单做url的访问权限验证
router.beforeEach((to, from, next) => {
  next()
})

export default router
