import * as types from '../mutation-types'

// initial state
const state: any = {
  // 应用的一些设置，比如系统名称
  app: { name: 'Vue框架工程' },
  // 字典数据
  dictionary: [],
  userinfo: { username: '王小二' }
}

// getters
const getters: any = {}

// mutations
const mutations: any = {
  [types.DICTIONARY] (state, data) {
    state.dictionary = data
  },
  [types.USERINFO] (state, data) {
    state.userinfo = data
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
