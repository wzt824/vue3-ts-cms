<template>
  <div class="page-warp">
    <el-tooltip content="Top center" placement="top">
      <el-button>{{ $store.state.name }}</el-button>
    </el-tooltip>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const message = ref('首页页面')
    return {
      message
    }
  }
})
</script>

<style scoped lang='less'>

</style>
