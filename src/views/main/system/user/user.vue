<template>
  <div class="user-wrap">
    <page-search
      :searchFormConfig='searchFormConfig'
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"/>
    <page-table
      ref="pageTableRef"
      pageName="users"
      :listTableConfig='listTableConfig'
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @showBtnClick="handleShowData"
    >
      <!-- 跨组件插槽:用户特有的插槽 -->
      <template #status="scope">
        <el-tag :type="scope.row.enable ? 'success' : 'danger'">{{ scope.row.enable ? '启用' : '禁用' }}</el-tag>
      </template>
    </page-table>

    <page-model
      ref="pageModelRef"
      :defaultInfo='defaultInfo'
      pageName="users"
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
  name: 'user',
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
      const passworldItem = modelConfig.formItems.find((item) => item.field === 'password')
      passworldItem!.isHidden = false
      modelConfig.fromDisabled = false
    }
    const editClickCallback = (data: any) => {
      console.log({...data})
      const passworldItem = modelConfig.formItems.find((item) => item.field === 'password')
      passworldItem!.isHidden = true
      modelConfig.fromDisabled = false
    }
    const showClickCallback = () => {
      const passworldItem = modelConfig.formItems.find((item) => item.field === 'password')
      passworldItem!.isHidden = true
      modelConfig.fromDisabled = true
    }
    // 2.动态添加部门和角色列表
    const store = useStore()
    // 副作用函数，用于实时获取vuex中的数据动态插入配置中
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return {title: item.name, value: item.id}
      })
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
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
      handleNewData,
      handleEditData,
      handleShowData,
      pageModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang='less'>

</style>
