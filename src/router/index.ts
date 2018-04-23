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
      path: loginURL,
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

// 两种避免验证的方式
const needLogin = to => to.meta.needAuth !== false && !config.whiteList.test(to.path)

// 登录验证
router.beforeEach((to, from, next) => {
  if (to.path === loginURL) {
    if (sessionStorage.getItem('accessToken')) {
      next({ path: homeURL })
    } else {
      next()
    }
  } else {
    if (sessionStorage.getItem('accessToken') || !needLogin(to)) {
      next()
    } else {
      sessionStorage.setItem('beforeLogin', to.path)
      next({ path: loginURL })
    }
  }
})

// 基于菜单做url的访问权限验证
router.beforeEach((to, from, next) => {
  if (to.path === loginURL || !needLogin(to)) {
    next()
    return
  }

  if (to.meta.hasSubPerm === true) { // 本url有更细的权限控制
    if (hasPerm(to.fullPath)) {
      next()
      return
    }
  } else {
    if (hasPerm(to.path)) {
      next()
      return
    }
  }

  // 以恰当的形式给出提示
  console.log('No permission!')
  next({ path: '/no-permission' })
})

// 判断当前用户是否具有要求的权限
const hasPerm = requiredPerm => {
  let reg = new RegExp(requiredPerm)
  let perms = JSON.parse(sessionStorage.getItem('permission'))

  if (perms && perms.length > 0) {
    for (let one of perms) {
      if (one === requiredPerm) return true

      let mg = one.match(requiredPerm)
      if (mg && mg[0] === one) return true
    }
  }
  return false
}

export default router
