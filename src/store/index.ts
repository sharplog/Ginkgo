import Vue from 'vue'
import Vuex from 'vuex'
import Default from './modules/default'

Vue.use(Vuex)

const getters = {
  appConf: state => state.Default.appConf,
  dictionary: state => state.Default.dictionary,
  userinfo: state => state.Default.userinfo,

  appName: state => state.Default.appConf.name,
  userName: state => state.Default.userinfo.name,
  token: state => state.Default.appState.token
}

export default new Vuex.Store({
  modules: {
    Default
  },
  getters
})
