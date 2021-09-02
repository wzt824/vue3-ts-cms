<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
// import { IDataType } from '../types'
export default defineComponent({
  components: {
    BaseEchart
  },
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    xLables: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    isShowToolBox: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const options = computed (() => {
      return {
        toolbox: {
          show: props.isShowToolBox,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            saveAsImage: {show: true}
          }
        },
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['销量/件']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.xLables
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销量/件',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: props.values
          }
        ]
      }
    })

    return {
      options
    }
  }
})
</script>

<style scoped lang='less'>

</style>
