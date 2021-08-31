
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IProductState } from './types'

import { getPageListData } from '@/api/main/system/system'

const systemModule: Module<IProductState, IRootState> = {
  // 给模块添加命名空间
  namespaced: true,
  state () {
    return {
      goodsList: [],
      goodsTotalCount: 0
    }
  },
  mutations: {
    changeUserList (state, userList: any) {
      state.userList = userList
    },
    changeUserTotalCount (state, userTotalCount: number) {
      state.userTotalCount = userTotalCount
    },
    changeRoleList (state, roleList: any) {
      state.roleList = roleList
    },
    changeRoleTotalCount (state, roleTotalCount: number) {
      state.roleTotalCount = roleTotalCount
    }
  },
  getters: {
    pageListData (state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount (state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}TotalCount`]
      }
    }
  },
  actions: {
    // 获取数据
    async getPageListAction({ commit }, payload: any){
      const pageName = payload.pageName

      let pageUrl = ''
      switch (pageName) {
        case 'user':
          pageUrl = '/users/list'
          break;
        case 'role':
          pageUrl = '/role/list'
          break;
      }
      // 发送网络请求
      const pageResult = await getPageListData(pageUrl , payload.queryInfo)
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case 'user':
          commit('changeUserList', list)
          commit('changeUserTotalCount', totalCount)
          break;
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleTotalCount', totalCount)
          break;
      }
    }
  }
}

export default systemModule
