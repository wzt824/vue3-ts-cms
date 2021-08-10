<template>
  <div class="page-warp">
    {{message}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const message = ref('登录页面')
    return {
      message
    }
  }
})
</script>

<style scoped lang='less'>

</style>
