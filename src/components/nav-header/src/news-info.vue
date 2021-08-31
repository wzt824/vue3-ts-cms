<template>
  <div class="news-info">
    <el-badge :is-dot="isDot" class="item">
      <i class="el-icon-chat-dot-round"></i>
    </el-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const isDot = ref(false)
    return {
      isDot
    }
  }
})
</script>

<style scoped lang='less'>
  .news-info {
    /deep/ .is-dot {
      width: 5px;
      height: 5px;
      background-color: red;
    }
  }

</style>
