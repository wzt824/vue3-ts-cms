<template>
  <div class="rose-echart">
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
    pieData: {
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
        legend: {
          top: 'left'
        },
        toolbox: {
          show: props.isShowToolBox,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [20, 125],
            center: ['50%', '60%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.pieData
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
