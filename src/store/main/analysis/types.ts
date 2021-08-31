export interface IDashboardState {
  // 不同商品对应的库存
  categoryGoodsCount: any[]
  // 不同商品对应的销量
  categoryGoodsSale: any[]
  // 不同商品对应的收藏
  categoryGoodsFavor: any[]
  // 销量前10的商品数量
  tenGoodsSale: any[]
  // 不同城市的销量数据
  addressGoodsSale: any[]
  // 商品数据统计的数量
  amountGoodsList: any[]
}
