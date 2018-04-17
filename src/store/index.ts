import Vue from 'vue'
import Vuex from 'vuex'
import Default from './modules/default'

Vue.use(Vuex)

const getters = {
  app: state => state.Default.app,
  dictionary: state => state.Default.dictionary,
  userinfo: state => state.Default.userinfo,

  token: state => state.Default.app.token
}

export default new Vuex.Store({
  modules: {
    Default
  },
  getters
})
