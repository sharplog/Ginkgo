import * as types from '../mutation-types'

// initial state
const state: any = {
  // 应用的一些配置，比如系统名称
  appConf: {},

  // 应用的状态数据
  appState: {},

  // 顶部菜单，位于Header中
  topMenu: [],

  // 左侧菜单，位于Sider中
  sideMenu: [],

  // 权限列表
  permission: [],

  // 字典数据
  dictionary: [],

  userinfo: {}
}

// getters
const getters: any = {}

// mutations
const mutations: any = {
  [types.APPCONF] (state, data) {
    state.appConf = data
  },
  [types.TOPMENU] (state, data) {
    state.topMenu = data
  },
  [types.SIDEMENU] (state, data) {
    state.sideMenu = data
  },
  [types.PERMISSION] (state, data) {
    state.permission = data
  },
  [types.DICTIONARY] (state, data) {
    state.dictionary = data
  },
  [types.USERINFO] (state, data) {
    state.userinfo = data
  },
  [types.NOTICENUM] (state, data) {
    state.appState.noticeNum = data
  },
  [types.BEFORELOGIN] (state, data) {
    state.appState.beforeLogin = data
  }
}

// actions
const actions: any = {
  [types.DICTIONARY] (context) {
    // (<any>window).vue.$http.get('/safe-api/dictionary').then((data) => {
    //   context.commit(types.SAFEDICTIONARY, data.data.rows)
    // })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
