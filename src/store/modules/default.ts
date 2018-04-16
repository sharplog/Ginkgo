import * as types from '../mutation-types'

// initial state
const state: any = {
  // 字典数据
  dictionary: [],
  userinfo: {}
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
