<template>
  <div class="notice-info">
    <el-badge :is-dot="isDot" class="item">
      <i class="el-icon-bell"></i>
    </el-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  setup () {
    const isDot = ref(false)
    onMounted(() => {
      isDot.value = true
    })
    return {
      isDot
    }
  }
})
</script>

<style scoped lang='less'>
  .notice-info {
    /deep/ .is-dot {
      width: 5px;
      height: 5px;
      background-color: red;
    }
  }

</style>
