<template>
  <div class="dashboard-wrap">
    <el-row :gutter="10">
      <el-col :span="7">
        <zt-card title="分类商品数量(饼图)"></zt-card>
      </el-col>
      <el-col :span="10">
        <zt-card title="不同城市商品售量"></zt-card>
      </el-col>
      <el-col :span="7">
        <zt-card title="分类商品数量(玫瑰图)"></zt-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="count-row">
      <el-col :span="12">
        <zt-card title="分类商品的数量">
          <base-echart></base-echart>
        </zt-card>
      </el-col>
      <el-col :span="12">
        <zt-card title="不同城市的收藏"></zt-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ZtCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'

import { useStore } from '@/store'

export default defineComponent({
  name: 'dashboard',
  components: {
    ZtCard,
    BaseEchart
  },
  setup() {

    const store = useStore()
    store.dispatch('dashboard/getDashboarDatadAction')

    return {

    }
  }
})
</script>

<style scoped lang="less">
.count-row {
  margin-top: 20px;
}
</style>
