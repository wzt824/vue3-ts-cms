<template>
  <div class="bar-across-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import BaseEchart from '@/base-ui/echart'
export default defineComponent({
  components: {
    BaseEchart
  },
  props: {
    title: {
      type: String,
      default: '主标题'
    },
    subTitle: {
      type: String,
      default: '副标题'
    },
    yLables: {
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
          text: props.title,
          subtext: props.subTitle
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['销量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            inside: true,
            width: 200,
            overflow: 'truncate',
            textBorderColor: 'red',
            textStyle: {
              color: '#000',
            }
          },
          z: 10,
          data: props.yLables
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            itemStyle: {
              color: 'skyblue'
            },
            data:props.values
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
