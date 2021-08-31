import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { accountLoginRequest, requestUserInfoById, requestUserMenusByRoleId } from '@/api/login/login'
import { IAccount } from '@/api/login/type'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'
import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  // 给模块添加命名空间
  namespaced: true,
  state () {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
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

      // 将获取到的userMenus插入到router.main.chinlren中
      const routes = mapMenusToRoutes(state.userMenus)
      routes.forEach(route => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenusToPermission(userMenus)
      // 保存用户权限信息
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction ({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 发送初始化请求：获取完整的角色和部门
      dispatch('getInitialDataAction', null, { root: true })

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
      console.log('执行验证码登录的action', commit, payload)
    },

    loadLocalLogin ({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)

        // 发送初始化请求：获取完整的角色和部门
        dispatch('getInitialDataAction', null, { root: true })
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
