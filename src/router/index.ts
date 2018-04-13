import Vue from 'vue'
import Router from 'vue-router'

declare let require

// 这儿最后不能加文件名称 :(
const _import = (r, file) => require.ensure([], () => r(require('../components/' + file + '.vue')))

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: r => _import(r, 'Business'),
      children: [
        {
          path: '',
          component: r => _import(r, 'Home')
        }
      ]
    }
  ]
})
