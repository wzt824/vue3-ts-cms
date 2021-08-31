<template>
  <div class="dashboard-wrap">
    <h2>dashboard</h2>
    <div ref="divRef" style="width:500px;height:400px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    // 通过绑定ref获取dom元素
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // 1. 初始化echarts实例
      const echartsInstance = echarts.init(divRef.value!, 'light', {
        renderer: 'svg'
      })
      // 2. 指定图表的配置项和数据
      const option = {
        title: {
          text: 'ECharts 入门示例',
          subtext: '这是一个副标题'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'effectScatter',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 3.使用刚指定的配置项和数据显示图表。
      echartsInstance.setOption(option)
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped lang="less"></style>
