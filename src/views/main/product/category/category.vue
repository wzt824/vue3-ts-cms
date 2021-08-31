<template>
  <div class="category-wrap">
    <page-search
      :searchFormConfig='searchFormConfig'
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"/>
    <page-table
      ref="pageTableRef"
      pageName="category"
      :listTableConfig="listTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @showBtnClick="handleShowData"
    ></page-table>

    <page-model
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      pageName="category"
      :modelConfig="modelConfig"
    ></page-model>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search-from.config'
import { listTableConfig } from './config/list-table.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageTable } from '@/hooks/usePageTable'

export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageTable,
    PageModel
  },
  setup() {
    // hooks
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 1. usePageTable的回调函数处理密码是否展示问题
    const newClickCallback = () => {
      modelConfig.fromDisabled = false
    }
    const editClickCallback = () => {
      modelConfig.fromDisabled = false
    }
    const showClickCallback = () => {
      modelConfig.fromDisabled = true
    }

    // 2.动态添加部门和角色列表

    // 3.table 表格相关按钮的hooks
    const [
      pageModelRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      handleShowData] = usePageTable(newClickCallback, editClickCallback, showClickCallback)

    return {
      searchFormConfig,
      listTableConfig,
      modelConfig,
      pageTableRef,
      handleResetClick,
      handleQueryClick,
      pageModelRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      handleShowData
    }
  }
})
</script>

<style scoped lang="less"></style>
