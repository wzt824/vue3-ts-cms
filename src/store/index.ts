import { createStore } from 'vuex'
import { IRootState } from './type'
import login from './login/login'

const store = createStore<IRootState>({
  state () {
    return {
      name: '测试vuex',
      age: 21
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

// 防止刷新页面后，清空vuex里的用户数据
export function setupStore () {
  store.dispatch('login/loadLocalLogin')
}

export default store
