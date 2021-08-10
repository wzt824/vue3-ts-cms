import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义接口
export interface ZTRequestInterceptors<T = AxiosResponse> {
  // 请求成功的拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求失败的拦截
  requestInterceptorCatch?: (error: any) => any
  // 响应成功的拦截
  responseInterceptor?: (res: T) => T
  // 响应失败的拦截
  responseInterceptorCatch?: (error: any) => any
}

// 接口继承及其扩展
export interface ZTRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZTRequestInterceptors<T>
  showLoading?: boolean
}
