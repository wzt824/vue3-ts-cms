
/**
 * 此hook是用于用户按钮权限
 * @param pageName 功能页面：用户管理、部门管理...
 * @param handleName 操作按钮功能：增删改查
 */
import { useStore } from "@/store"

export function usePermission (pageName: string, handleName: string) {
  const store = useStore()
  // 获取vuex里存储的所有权限信息
  const permissions = store.state.login.permissions
  // 需要验证的权限信息
  const verifyPermission = `system:${pageName}:${handleName}`
  // !! 表示将所得数据转为布尔值
  return !!permissions.find((item) => item === verifyPermission)
}
