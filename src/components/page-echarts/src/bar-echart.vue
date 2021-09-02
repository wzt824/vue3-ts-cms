<template>
  <div class="bar-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
import * as echarts from 'echarts'
export default defineComponent({
  components: {
    BaseEchart
  },
  props: {
    title: {
      type: String,
      default: '特性示例：渐变色 阴影 点击缩放'
    },
    subTitle: {
      type: String,
      default: ''
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
    },
    isInside: {
      type: Boolean,
      default: false
    },
    textStyleColor: {
      type: String,
      default: '#000'
    },
    isDataZoomDisabled: {
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        title: {
          text: props.title,
          subtext: props.subTitle
        },
        xAxis: {
          data: props.xLables,
          axisLabel: {
            inside: props.isInside,
            textStyle: {
              color: props.textStyleColor
            }
          },
          axisTick: {
            show: props.isInside
          },
          axisLine: {
            show: props.isInside
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            disabled: props.isDataZoomDisabled
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
              )
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                  ]
                )
              }
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
