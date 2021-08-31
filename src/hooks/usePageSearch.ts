// 此hook用于搜索功能的封装：重置和搜索
import { ref } from 'vue'
import PageTable from '@/components/page-table'

export function usePageSearch (): any {
  const pageTableRef = ref<InstanceType<typeof PageTable>>()

  const handleResetClick = (): any => {
    pageTableRef.value?.getPageData()
  }

  const handleQueryClick = (queryInfo: any) => {
    pageTableRef.value?.getPageData(queryInfo)
  }

  // js：数组  ts：元组
  return [pageTableRef, handleResetClick, handleQueryClick]
}
