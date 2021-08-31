import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
// 导入模块信息
import login from './login/login'
import system from './main/system/system'
// import product from './main/product/product'
import dashboard from './main/analysis/dashboard'

// 获取接口信息
import { getPageListData } from '@/api/main/system/system'

const store = createStore<IRootState>({
  state () {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
      entireCategory: []
    }
  },
  mutations: {
    changeEntireDepartment (state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntireRole (state, roleList) {
      state.entireRole = roleList
    },
    changeEntireMenu (state, menuList) {
      state.entireMenu = menuList
    },
    changeEntireCategory (state, categoryList) {
      state.entireCategory = categoryList
    }
  },
  getters: {},
  actions: {
    // 获取初始化数据
    async getInitialDataAction ({ commit }) {
      // 1 获取数据
      // 1.1 请求获取部门信息
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      // list: departmentList  表示先解构在起别名
      const { list: departmentList } = departmentResult.data
      // 1.2 请求获取角色信息
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      // 1.3 请求获取权限信息
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 1.4 请求获取权限信息
      const categoryResult = await getPageListData('/category/list', {})
      const { list: categoryList } = categoryResult.data

      // 2. 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
      commit('changeEntireCategory', categoryList)
    }
  },
  modules: {
    login,
    system,
    dashboard
    // product
  }
})

// 防止刷新页面后，清空vuex里的用户数据
export function setupStore (): void {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

// 兼容useState
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
