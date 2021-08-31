
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'

import { ElMessage } from 'element-plus'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/api/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  // 给模块添加命名空间
  namespaced: true,
  state () {
    return {
      // 搜索条件
      searchConditions: {},
      usersList: [],
      usersTotalCount: 0,
      roleList: [],
      roleTotalCount: 0,
      goodsList: [],
      goodsTotalCount: 0,
      menuList: [],
      menuTotalCount: 0,
      departmentList: [],
      departmentTotalCount: 0,
      categoryList: [],
      categoryTotalCount: 0
    }
  },
  mutations: {
    changeUserList (state, usersList: any) {
      state.usersList = usersList
    },
    changeUserTotalCount (state, usersTotalCount: number) {
      state.usersTotalCount = usersTotalCount
    },
    changeRoleList (state, roleList: any) {
      state.roleList = roleList
    },
    changeRoleTotalCount (state, roleTotalCount: number) {
      state.roleTotalCount = roleTotalCount
    },
    changeGoodsList (state, goodsList: any) {
      state.goodsList = goodsList
    },
    changeGoodsTotalCount (state, goodsTotalCount: number) {
      state.goodsTotalCount = goodsTotalCount
    },
    changeMenuList (state, menuList: any) {
      state.menuList = menuList
    },
    changeMenuTotalCount (state, menuTotalCount: number) {
      state.menuTotalCount = menuTotalCount
    },
    changeDepartmentList (state, departmentList: any) {
      state.departmentList = departmentList
    },
    changeDepartmentTotalCount (state, departmenTotalCount: number) {
      state.departmentTotalCount = departmenTotalCount
    },
    changeCategoryList (state, categoryList: any) {
      state.categoryList = categoryList
    },
    changeCategoryTotalCount (state, categoryTotalCount: number) {
      state.categoryTotalCount = categoryTotalCount
    },
    changeSearchConditions (state, searchConditions: any) {
      state.searchConditions = searchConditions
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
        case 'users':
          pageUrl = '/users/list'
          break;
        case 'role':
          pageUrl = '/role/list'
          break;
        case 'menu':
          pageUrl = '/menu/list'
          break;
        case 'goods':
          pageUrl = '/goods/list'
          break;
        case 'department':
          pageUrl = '/department/list'
          break;
        case 'category':
          pageUrl = '/category/list'
          break;
      }
      // 发送网络请求
      const pageResult = await getPageListData(pageUrl , payload.queryInfo)

      const { list, totalCount } = pageResult.data
      const total = list.length > 0 ?  totalCount : 0
      switch (pageName) {
        case 'users':
          commit('changeUserList', list)
          commit('changeUserTotalCount', total)
          break;
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleTotalCount', total)
          break;
        case 'menu':
          commit('changeMenuList', list)
          commit('changeMenuTotalCount', total)
          break;
        case 'goods':
          commit('changeGoodsList', list)
          commit('changeGoodsTotalCount', total)
          break;
        case 'department':
          commit('changeDepartmentList', list)
          commit('changeDepartmentTotalCount', total)
          break;
        case 'category':
          commit('changeCategoryList', list)
          commit('changeCategoryTotalCount', total)
          break;
      }
    },

    // 删除操作
    async deletePageListAction({ dispatch }, payload: any){
      // payload: pageName, id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 发送网络请求
      const requestResult = await deletePageData(pageUrl)

      dispatch('actionCommonFun', {pageName: pageName, requestResult: requestResult})
    },

    // 新建操作
    async createPageListAction({ dispatch }, payload: any){
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      const requestResult = await createPageData(pageUrl, newData)

      dispatch('actionCommonFun', {pageName: pageName, requestResult: requestResult})
    },

    // 编辑操作
    async editPageListAction({ dispatch }, payload: any){
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      const requestResult = await editPageData(pageUrl, editData)

      dispatch('actionCommonFun', {pageName: pageName, requestResult: requestResult})
    },

    // 公共处理方法
    actionCommonFun({ state, dispatch }, payload: any) {
      const { pageName, requestResult } = payload
      const { code, data } = requestResult
      if (code !== 0) {
        return ElMessage({
          showClose: true,
          message: data,
          type: 'error'
        })
      } else {
        ElMessage({
          showClose: true,
          message: data,
          type: 'success',
          duration: 1500
        })

        // 重新请求最新数据
        dispatch('getPageListAction', {
          pageName,
          queryInfo: {
            offset: 0,
            size: 10,
            ...state.searchConditions
          }
        })
      }
    }

  }
}

export default systemModule
