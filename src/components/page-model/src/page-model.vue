<template>
  <div class="page-model">
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      width="30%"
      destroy-on-close
      center
    >
      <zt-form v-bind="modelConfig" v-model="formData"></zt-form>
      <!-- 配置默认插槽 -->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer" v-if="isShowModel">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveClick">确 定</el-button>
        </span>
        <span v-else>
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </template>

    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import ZtForm from '@/base-ui/form'
export default defineComponent({
  components: {
    ZtForm
  },
  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    const titlePageName = ref('')
    const title = ref('')
    const isShowModel = ref(true)

    switch (props.pageName) {
      case 'users':
        titlePageName.value = '用户'
        break;
      case 'role':
        titlePageName.value = '角色'
        break;
      case 'menu':
        titlePageName.value = '菜单'
        break;
      case 'goods':
        titlePageName.value = '商品'
        break;
      case 'department':
        titlePageName.value = '部门'
        break;
      case 'category':
        titlePageName.value = '分类'
        break;

      default:
        titlePageName.value = '默认标题'
        break;
    }

    // 监听defaultInfo数据，赋值给formData
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modelConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }

        if (Object.keys(props.defaultInfo).length) {
          const menuName = !props.modelConfig.fromDisabled ? '编辑' : '查看'
          isShowModel.value = menuName === '编辑' ? true : false
          title.value = menuName + titlePageName.value + '信息'
        } else {
          title.value = '创建' + titlePageName.value
        }
      }
    )



    const store = useStore()
    const handleSaveClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageListAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })

      } else {
        // 新增
        store.dispatch('system/createPageListAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleSaveClick,
      title,
      isShowModel
    }
  }
})
</script>

<style scoped lang='less'>

</style>
