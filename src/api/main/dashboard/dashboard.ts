import ztRequest from '@/api'
import { IDataType } from '@/api/types'

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  tenGoodsSale = '/goods/sale/top10',
  addressGoodsSale = '/goods/address/sale',
  amountGoodsList = '/goods/amount/list'
}

// 获取不同商品对应的库存
export function getCategoryGoodsCount () {
  return ztRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

// 获取不同商品对应的销量
export function getCategoryGoodsSale () {
  return ztRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

// 获取不同商品对应的收藏
export function getCategoryGoodsFavor () {
  return ztRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

// 销量前10的商品数量
export function getTenGoodsSale () {
  return ztRequest.get<IDataType>({
    url: DashboardAPI.tenGoodsSale
  })
}

// 不同城市的销量数据
export function getAddressGoodsSale () {
  return ztRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}

// 商品数据统计的数量
export function getAmountGoodsList () {
  return ztRequest.get<IDataType>({
    url: DashboardAPI.amountGoodsList
  })
}
