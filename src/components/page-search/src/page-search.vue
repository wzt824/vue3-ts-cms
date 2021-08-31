<template>
  <div class="page-search">
    <zt-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="common-headder">高级检索</h1>
      </template>
      <template #footer>
        <div class="header-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="handleSearchClick">搜索</el-button>
        </div>
      </template>
    </zt-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ZtForm from '@/base-ui/form'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    ZtForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup (props, { emit }) {
    const store = useStore()

    // 双向绑定的属性应该由配置文件中的filed决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      // 将数据插入formOriginData中，且赋值为空字符串
      formOriginData[item.field] = ''
    }
    // formData中的属性应该是动态决定的
    const formData = ref(formOriginData)
    // 重置功能
    const handleResetClick = (): any => {
      formData.value = formOriginData
      store.commit('system/changeSearchConditions', formOriginData)
      emit('resetBtnClick')
    }
    // 搜索功能
    const handleSearchClick = () => {
      store.commit('system/changeSearchConditions', {...formData.value})
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang='less'>
.page-search{
  margin-bottom: 20px;
}
.header-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
