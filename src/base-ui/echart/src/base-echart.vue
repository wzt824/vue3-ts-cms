<template>
  <div class="base-echart">
    <div ref="echartDivRef" style="width:500px;height:400px;"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  setup() {
    const echartDivRef = ref<HTMLElement>()
    onMounted(() => {
      // 1.创建echarts实例 vue生命周期onMounted中dom元素加载完成
      const echartInstance = echarts.init(echartDivRef.value!)
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
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }

      // 3.使用刚指定的配置项和数据显示图表。
      echartInstance.setOption(option)
    })

    return {
      echartDivRef
    }
  }
})
</script>

<style scoped lang='less'>

</style>
