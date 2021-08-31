// 此hook用于表格按钮功能的封装：新建、编辑、查看
import { ref } from 'vue'
import PageModel from '@/components/page-model'

type callBackFn = (data?: any) => void

export function usePageTable (newCb?: callBackFn, editCb?: callBackFn, showCb?: callBackFn): any {
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const defaultInfo = ref({})

  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (data: any) => {
    defaultInfo.value = { ...data }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb(data)
  }
  const handleShowData = (data: any) => {
    defaultInfo.value = { ...data }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    showCb && showCb(data)
  }

  // js：数组  ts：元组
  return [pageModelRef, defaultInfo, handleNewData, handleEditData, handleShowData]
}
