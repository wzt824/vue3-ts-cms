<template>
  <div class="page-table">
    <!-- 表格主体 -->
    <zt-table v-bind="listTableConfig" :listData="dataList" :listCount="dataCount" v-model:page="pageInfo">
      <!-- header部分的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
        >{{btnName}}</el-button>
      </template>

      <!-- 表格主题公共部分的插槽 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <el-button type="text" icon="el-icon-view" @click="handleShowClick(scope.row)">查看</el-button>
        <el-button v-if="isUpdate" type="text" icon="el-icon-edit" @click="handleEditClick(scope.row)">编辑</el-button>
        <el-button v-if="isDelete" type="text" icon="el-icon-delete" @click="handleDeleteClick(scope.row)">删除</el-button>
      </template>

      <!-- 特殊属性的动态插槽：此处插槽由父组件决定 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

    </zt-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'
import { ElMessageBox, ElMessage } from 'element-plus'

import ZtTable from '@/base-ui/table'
export default defineComponent({
  props: {
    listTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    ZtTable
  },
  emits: ['newBtnClick', 'editBtnClick', 'showBtnClick'],
  setup (props, { emit }) {
    const store = useStore()

    // 0.获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo及其按钮name
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    const btnName = ref('')
    watch(pageInfo, () => getPageData(store.state.system.searchConditions))

    switch (props.pageName) {
      case 'users':
        btnName.value = '创建用户'
        break;
      case 'role':
        btnName.value = '创建角色'
        break;
      case 'menu':
        btnName.value = '创建菜单'
        break;
      case 'goods':
        btnName.value = '创建商品'
        break;
      case 'department':
        btnName.value = '创建部门'
        break;
      case 'category':
        btnName.value = '创建分类'
        break;

      default:
        btnName.value = '默认按钮'
        break;
    }

    // 2. 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          // 展开运算符
          ...queryInfo
        }
      })
    }
    getPageData()
    // 3. 用vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 4. 获取其他的动态插槽名称(通过filter进行数据过滤，从而达到数据收集的效果)
    const otherPropSlots = props.listTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5.删除/编辑/新建操作
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (data: any) => {
      emit('editBtnClick', data)
    }
    const handleDeleteClick = (data: any) => {
      ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        store.dispatch('system/deletePageListAction', {
          pageName: props.pageName,
          id: data.id
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
          duration: 1500
        })
      })
    }
    const handleShowClick = (data: any) => {
      emit('showBtnClick', data)
    }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      btnName,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleNewClick,
      handleEditClick,
      handleDeleteClick,
      handleShowClick
    }
  }
})
</script>

<style scoped lang='less'>
.page-table{
  padding: 20px;
  border-top: 20px solid #f0f2f5;
  .header {
    text-indent: 20px;
    padding-bottom: 10px;
  }

}
</style>
