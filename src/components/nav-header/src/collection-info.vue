<template>
  <div class="collection-info">
    <el-badge :is-dot="isDot" class="item">
      <i class="el-icon-collection-tag"></i>
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
.collection-info {
  /deep/ .is-dot {
    width: 5px;
    height: 5px;
    background-color: red;
  }
}
</style>
