import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      message: '测试vuex'
    }
  },
  mutations: {},
  getters: {},
  actions: {}
})

export default store
