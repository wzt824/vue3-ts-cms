import { Module } from 'vuex'
import { IRootState } from '../../types'
import { IDashboardState } from './types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale,
  getAmountGoodsList,
  getTenGoodsSale
} from '@/api/main/dashboard/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state () {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      tenGoodsSale: [],
      addressGoodsSale: [],
      amountGoodsList: []
    }
  },
  mutations: {
    changeCategoryGoodsCount (state, list: any[]) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale (state, list: any[]) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor (state, list: any[]) {
      state.categoryGoodsFavor = list
    },
    changeTenGoodsSale (state, list: any[]) {
      state.tenGoodsSale = list
    },
    changeAddressGoodsSale (state, list: any[]) {
      state.addressGoodsSale = list
    },
    changeAmountGoodsList (state, list: any[]) {
      state.amountGoodsList = list
    }
  },
  actions: {
    async getDashboarDatadAction ({ commit }) {
      // 1. 发送网络请求获取数据
      // 1.1 获取库存的数据
      const countResult = await getCategoryGoodsCount()
      // 1.2 获取售量的数据
      const saleResult = await getCategoryGoodsSale()
      // 1.3 获取收藏的数据
      const favorResult = await getCategoryGoodsFavor()
      // 1.4 获取售量前10的数据
      const tenResult = await getTenGoodsSale()
      // 1.5 获取城市售量数据
      const addressResult = await getAddressGoodsSale()
      // 1.6 获取商品统计的数据
      const amountResult = await  getAmountGoodsList()

      // 2. 保存数据
      commit('changeCategoryGoodsCount', countResult.data)
      commit('changeCategoryGoodsSale', saleResult.data)
      commit('changeCategoryGoodsFavor', favorResult.data)
      commit('changeTenGoodsSale', tenResult.data)
      commit('changeAddressGoodsSale', addressResult.data)
      commit('changeAmountGoodsList', amountResult.data)
    }
  }
}

export default dashboardModule
