<template>
  <div class="menu-wrap">
    <page-table
      pageName="menu"
      :listTableConfig='listTableConfig'
    >
      <!-- 跨组件插槽:菜单特有的插槽 -->
      <template #type="scope">
        {{scope.row.type === 1 ? '一级菜单' : scope.row.type === 2 ? '二级菜单' : '按钮' }}
      </template>
    </page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTable from '@/components/page-table'
import { listTableConfig } from './config/list-table.config'

export default defineComponent({
  name: 'zt-menu',
  components: {
    PageTable
  },
  setup() {
    return {
      listTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
