import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
// 存放类型的的文件
export interface IRootState {
  entireDepartment: any[] // 全部的部门
  entireRole: any[] // 全部的角色
  entireMenu: any[] // 全部的权限
  entireCategory: any[] // 全部的权限
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootWithModule & IRootState
