import * as types from '../mutation-types'

// initial state
const state: any = {
  // 应用的一些配置，比如系统名称
  appConf: {},

  // 应用的状态数据
  appState: {},

  // 字典数据
  dictionary: [],
  userinfo: { name: '王小二' }
}

// getters
const getters: any = {}

// mutations
const mutations: any = {
  [types.APPCONF] (state, data) {
    state.appConf = data
  },
  [types.DICTIONARY] (state, data) {
    state.dictionary = data
  },
  [types.USERINFO] (state, data) {
    state.userinfo = data
  },
  [types.TOKEN] (state, data) {
    state.appState.token = data
  },
  [types.NOTICENUM] (state, data) {
    state.appState.noticeNum = data
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
