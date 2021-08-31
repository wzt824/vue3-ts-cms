import ztRequest from '@/api'
import { IDataType } from '@/api/types'

// 获取system下的列表数据
export function getPageListData (url: string, queryInfo: any) {
  return ztRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 根据id删除数据
export function deletePageData (url: string) {
  return ztRequest.delete<IDataType>({
    // url/id
    url: url
  })
}

// 创建数据
export function createPageData (url: string, newDate: any) {
  return ztRequest.post<IDataType>({
    url: url,
    data: newDate
  })
}

// 创建数据
export function editPageData (url: string, editDate: any) {
  return ztRequest.patch<IDataType>({
    url: url,
    data: editDate
  })
}
