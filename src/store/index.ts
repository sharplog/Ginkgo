import Vue from 'vue'
import Vuex from 'vuex'
import Default from './modules/default'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Default
  }
})
