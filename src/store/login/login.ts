import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'
import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/api/login/login'
import { IAccount } from '@/api/login/type'
import localCache from '@/utils/cache'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  // 给模块添加命名空间
  namespaced: true,
  state () {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  // 修改state唯一的方式是通过mutations
  mutations: {
    changeToken (state, token: string) {
      state.token = token
    },
    changeUserInfo (state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus (state, userMenus: any){
      state.userMenus = userMenus
    }
  },
  getters: {},
  actions: {
    async accountLoginAction ({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.获取用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 跳转到首页
      router.push('/main')
    },
    phoneLoginAction ({ commit }, payload: any) {
      console.log('执行验证码登录的action', payload)
    },

    loadLocalLogin ({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
