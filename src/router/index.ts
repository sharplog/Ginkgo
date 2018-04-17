import Vue from 'vue'
import Router from 'vue-router'

declare let require

Vue.use(Router)

export default new Router({
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
        }
      ]
    }
  ]
})
