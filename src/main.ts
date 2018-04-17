// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import service from './service'

import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iView)

Vue.prototype.$service = service

/* eslint-disable no-new */
const init = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
