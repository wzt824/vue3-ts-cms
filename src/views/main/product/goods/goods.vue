<template>
  <div class="goods-wrap">
    <page-search
      :searchFormConfig='searchFormConfig'
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"/>
    <page-table
      ref="pageTableRef"
      pageName="goods"
      :listTableConfig='listTableConfig'
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @showBtnClick="handleShowData"
    >
      <!-- 跨组件插槽:商品特有的插槽 -->
      <template #status="scope">
        <el-tag :type="scope.row.status ? 'success' : 'danger'">{{ scope.row.status ? '上架' : '已下架' }}</el-tag>
      </template>
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]">
        </el-image>
      </template>

      <template #handler>
        <el-button size="mini" type="info">新建</el-button>
        <el-button size="mini" type="primary">重置</el-button>
      </template>
    </page-table>

    <page-model
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      pageName="goods"
      :modelConfig="modelConfigRef"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search-from.config'
import { listTableConfig } from './config/list-table.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageTable } from '@/hooks/usePageTable'

export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageTable,
    PageModel
  },
  setup () {
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
    const store = useStore()
    // 副作用函数，用于实时获取vuex中的数据动态插入配置中
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'categoryId'
      )
      departmentItem!.options = store.state.entireCategory.map((item) => {
        return {title: item.name, value: item.id}
      })
      return modelConfig
    })

    // 3.table 表格相关按钮的hooks
    const [pageModelRef, defaultInfo, handleNewData, handleEditData, handleShowData] = usePageTable(newClickCallback, editClickCallback, showClickCallback)

    return {
      searchFormConfig,
      listTableConfig,
      modelConfigRef,
      handleResetClick,
      handleQueryClick,
      pageTableRef,
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
