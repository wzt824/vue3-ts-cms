<template>
  <div class="dashboard-wrap">

    <!-- 1.顶部数据统计 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <zt-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </zt-card>
      </el-col>
      <el-col :span="10">
        <zt-card title="不同城市商品售量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </zt-card>
      </el-col>
      <el-col :span="7">
        <zt-card title="分类商品销量(玫瑰图)">
          <rose-echart :pieData="categoryGoodsSale"></rose-echart>
        </zt-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="count-row">
      <el-col :span="12">
        <zt-card title="不同商品对应的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </zt-card>
      </el-col>
      <el-col :span="12">
        <zt-card title="不同商品对应的销量">
          <line-echart v-bind="categoryGoodsSaleLine"></line-echart>
        </zt-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="count-row">
      <el-col :span="12">
        <zt-card title="销量前10的商品数量">
          <bar-across-echart v-bind="tenGoodsSale"></bar-across-echart>
        </zt-card>
      </el-col>
      <el-col :span="12">
        <zt-card title="不同城市的销量数据(柱状图)">
          <bar-echart v-bind="addressGoodsSaleBar"></bar-echart>
        </zt-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ZtCard from '@/base-ui/card'
import StatisticalPanel from '@/components/statistical-panel'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart,
  BarAcrossEchart
} from '@/components/page-echarts'

import { useStore } from '@/store'

export default defineComponent({
  name: 'dashboard',
  components: {
    ZtCard,
    StatisticalPanel,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
    BarAcrossEchart
  },
  setup() {

    const store = useStore()
    store.dispatch('dashboard/getDashboarDatadAction')

    // 商品数据统计的数量，用于顶部数据统计
    const topPanelData = computed(() => store.state.dashboard.amountGoodsList)

    // 分类商品数量(饼图)
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item:any) => {
        return {name: item.name, value: item.goodsCount}
      })
    })

    // 分类商品销量(玫瑰图)
    const categoryGoodsSale = computed(() => {
      return store.state.dashboard.categoryGoodsSale.map((item:any) => {
        return {name: item.name, value: item.goodsCount}
      })
    })

    // 不同商品对应的销量
    const categoryGoodsSaleLine = computed(() => {
      const xLables: string[] = []
      const values: any[] = []
      const categoryGoodsSaleLine = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSaleLine) {
        xLables.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLables, values, title: '商品售量'}
    })

    // 不同商品对应的收藏
    const categoryGoodsFavor = computed(() => {
      const xLables: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLables.push(item.name)
        values.push(item.goodsFavor)
      }

      return {
        xLables,
        values,
        title: '商品收藏',
        subTitle: '不同商品对应的收藏排行榜',
        isInside: true,
        textStyleColor: '#fff'
      }
    })

    // 不同城市的销量数据
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item:any) => {
        return { name: item.address, value: item.count }
      })
    })

    // 销量前10的商品数量
    const tenGoodsSale = computed(() => {
      const yLables: string[] = []
      const values: any[] = []
      const tenGoodsSale = store.state.dashboard.tenGoodsSale
      const sortData = tenGoodsSale.sort((a, b) => {
        return a.saleCount - b.saleCount
      })
      for (const item of sortData) {
        yLables.push(item.name)
        values.push(item.saleCount)
      }

      return { yLables, values, title: '商品售量排行榜', subTitle: '销量前10的商品数量排行榜' }
    })

    // 不同城市的销量数据
    const addressGoodsSaleBar = computed(() => {
      const xLables: string[] = []
      const values: any[] = []
      const addressGoodsSaleBar = store.state.dashboard.addressGoodsSale
      for (const item of addressGoodsSaleBar) {
        xLables.push(item.address)
        values.push(item.count)
      }

      return { xLables, values, title: '不同城市的销量数据', isDataZoomDisabled: false }
    })

    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsSaleLine,
      categoryGoodsFavor,
      addressGoodsSale,
      tenGoodsSale,
      addressGoodsSaleBar
    }
  }
})
</script>

<style scoped lang="less">
.dashboard-wrap {
  min-width: 1250px;
}
.count-row {
  margin-top: 20px;
}
</style>
