import Vue from 'vue'
import Router from 'vue-router'

declare let require

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('@/components/' + 'Business' + '.vue')), 'Business'),
      children: [
        {
          path: '',
          component: r => require.ensure([], () => r(require('@/components/' + 'Home' + '.vue')), 'Home')
        }
      ]
    }
  ]
})
