// 存放类型的的文件
export interface ILoginState {
  token: string
  // 当前用户信息
  userInfo: any
  // 当前用户菜单
  userMenus: any
  // 当前用户权限
  permissions: string[]
}
