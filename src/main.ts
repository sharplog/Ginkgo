// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import service from './service'
import GinkgoMap from 'ginkgo-map'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(GinkgoMap)

Vue.prototype.$service = service
let win: any = window

/* eslint-disable no-new */
win.app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
