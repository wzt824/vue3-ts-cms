<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb :separator-class="separatorClass">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{path: item.path}">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    },
    separatorClass: {
      type: String,
      default: 'el-icon-arrow-right'
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang='less'>

</style>
