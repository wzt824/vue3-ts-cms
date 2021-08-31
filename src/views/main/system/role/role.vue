<template>
  <div class="role-wrap">
    <page-search
      :searchFormConfig='searchFormConfig'
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"/>
    <page-table
      ref="pageTableRef"
      pageName="role"
      :listTableConfig='listTableConfig'
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      @showBtnClick="handleShowData"
    />

    <page-model
      ref="pageModelRef"
      :defaultInfo='defaultInfo'
      :otherInfo="otherInfo"
      pageName="role"
      :modelConfig="modelConfig"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { mapMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'
import PageModel from '@/components/page-model'

import { searchFormConfig } from './config/search-from.config'
import { listTableConfig } from './config/list-table.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageTable } from '@/hooks/usePageTable'
export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageTable,
    PageModel
  },
  setup () {

    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    // hooks
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 1. usePageTable的回调函数处理密码是否展示问题
    const newClickCallback = () => {
      modelConfig.fromDisabled = false
    }

    const editClickCallback = (data: any) => {
      modelConfig.fromDisabled = false
      nextTick(() => {
        const leafKeys = mapMenuLeafKeys(data.menuList)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const showClickCallback = (data: any) => {
      modelConfig.fromDisabled = true
      nextTick(() => {
        const leafKeys = mapMenuLeafKeys(data.menuList)
        console.log({...menus.value})
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    // 2.table 表格相关按钮的hooks
    const [pageModelRef, defaultInfo, handleNewData, handleEditData, handleShowData] = usePageTable(newClickCallback, editClickCallback, showClickCallback)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    // 传递树形结构数据
    const otherInfo = ref({})
    // 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      listTableConfig,
      searchFormConfig,
      modelConfig,
      pageTableRef,
      pageModelRef,
      defaultInfo,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      handleShowData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang='less'>
  .menu-tree{
    padding-left: 20px;
  }
</style>
