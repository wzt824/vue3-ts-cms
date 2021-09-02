<template>
  <span ref="counterRef" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
// http://inorganik.github.io/countUp.js/
import { CountUp } from 'countup.js'
import { defaultConfigOptions, CountUpOptions } from '../config'

export default defineComponent({
  props: {
    number: {
      type: Number,
      default: 0
    },
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    // 获取dom元素
    const counterRef = ref<HTMLDivElement | null>(null)
    // 创建实例
    const instance = ref<CountUp | null>(null)

    watch(
      () => props.number,
      () => {
        update(props.number)
      }
    )
    onMounted(() => {
      createCounter()
    })

    const createCounter = () => {
      if (!counterRef.value) return
      // Object.assign(target, ...sources) 用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
      const opts: CountUpOptions = Object.assign(defaultConfigOptions, props.option)
      instance.value = new CountUp(counterRef?.value, props.number, opts)
      start()
    }

    const start = () => {
      if (!instance.value) return
      instance?.value.start()
    }
    const update = (number: number) => {
      if (!instance.value) return
      instance?.value.update(number)
    }
    return {
      counterRef
    }
  }
})
</script>

<style scoped lang="less"></style>
