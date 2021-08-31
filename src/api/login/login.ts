import ztRequest from '@/api'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '@/api/types'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // /users/:id
  UesrMenus = '/role/' // /role/:id/menu
}

// 登录接口
export function accountLoginRequest (account: IAccount) {
  return ztRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 获取当前登录用户信息
export function requestUserInfoById (id: number) {
  return ztRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

// 获取当前登录用户信息
export function requestUserMenusByRoleId (id: number) {
  return ztRequest.get<IDataType>({
    url: LoginAPI.UesrMenus + id + '/menu'
  })
}
