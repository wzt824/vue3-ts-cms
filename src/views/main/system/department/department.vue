<template>
  <div class="department-wrap">
    <page-search
      :searchFormConfig='searchFormConfig'
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"/>
    <page-table
      ref="pageTableRef"
      pageName="department"
      :listTableConfig="listTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @showBtnClick="handleShowData"
    >
      <template #parentId="scope">
        {{scope.row.parentId === 1 ? '一级部门' : scope.row.parentId === 2 ? '二级部门' : '独立部门' }}
      </template>
    </page-table>

    <page-model
      ref="pageModelRef"
      :defaultInfo='defaultInfo'
      pageName="department"
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
import { modelConfig } from './config/model.config'
import { listTableConfig } from './config/list-table.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageTable } from '@/hooks/usePageTable'

export default defineComponent({
  components: {
    PageTable,
    PageModel,
    PageSearch
  },
  name: 'department',
  setup() {

    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch()

    const newClickCallback = () => {
      modelConfig.fromDisabled = false
    }
    const editClickCallback = (data: any) => {
      if (!data.parentId) {
        defaultInfo._rawValue.parentId = '独立部门'
      }

      modelConfig.fromDisabled = false
    }
    const showClickCallback = (data: any) => {
      if (!data.parentId) {
        defaultInfo._rawValue.parentId = '独立部门'
      }
      modelConfig.fromDisabled = true
    }

    const [pageModelRef, defaultInfo, handleNewData, handleEditData, handleShowData] = usePageTable(newClickCallback, editClickCallback, showClickCallback)

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
