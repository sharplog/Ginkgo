import Vue from 'vue'
import Vuex from 'vuex'
import Default from './modules/default'

Vue.use(Vuex)

const getters = {
  appConf: state => state.Default.appConf,
  appState: state => state.Default.appState,
  dictionary: state => state.Default.dictionary,
  userinfo: state => state.Default.userinfo,
  topMenu: state => state.Default.topMenu,
  sideMenu: state => state.Default.sideMenu,

  appName: state => state.Default.appConf.name,
  appVendor: state => state.Default.appConf.vendor,
  userName: state => state.Default.userinfo.name,
  noticeNum: state => state.Default.noticeNum
}

export default new Vuex.Store({
  modules: {
    Default
  },
  getters
})
