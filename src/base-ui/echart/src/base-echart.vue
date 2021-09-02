<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{width: width, height: height}"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    },
    options: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOptions } = useEchart(echartDivRef.value!)

      watchEffect(() => {
        setOptions(props.options)
      })
    })

    return {
      echartDivRef
    }
  }
})
</script>

<style scoped lang='less'>

</style>
