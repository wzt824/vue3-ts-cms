import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { ZTRequestInterceptors, ZTRequestConfig } from './type'

import { ElLoading, ElMessage } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true

class ZTRequest {
  instance: AxiosInstance
  interceptors?: ZTRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor (config: ZTRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    // 默认所有请求展示loading
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 使用拦截器：先添加的先响应拦截（顺序可以自由调整）
    // 1.config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use((config) => {
      // console.log('请求成功的拦截器---所有')
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '请求中...',
          background: 'rgba(0, 0, 0, .5)'
        })
      }
      return config
    }, (err) => {
      // console.log('请求失败的拦截器---所有')
      return err
    })
    this.instance.interceptors.response.use((res) => {
      // console.log('响应成功的拦截器---所有')
      // 将loading移除
      this.loading?.close()

      // 拦截状态码是后台统一的，此处-1001是错误信息
      const data = res.data
      if (data === undefined) {
        ElMessage({
          showClose: true,
          message: '网络连接失败，请稍后再试',
          type: 'error'
        })
        return
      }
      if (data.code === '-1001') {
        // console.log('请求失败，错误信息')
      } else {
        return data
      }
    }, (err) => {
      // 移除loading
      this.loading?.close()

      // 根据请求失败的状态码展示不同的信息
      // console.log('响应失败的拦截器---所有')
      if (err.response.status === 404) {
        console.log('404 not find~')
      }
      return err
    })
  }

  request<T = any> (config: ZTRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理：单个请求体的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance.request<any, T>(config).then((res) => {

        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        // 设置为true不会影响下一个请求
        this.showLoading = DEFAULT_LOADING

        // 将结果传递出去
        resolve(res)

      }).catch((err) => {
        // 设置为true不会影响下一个请求
        this.showLoading = DEFAULT_LOADING
        // 将结果传递出去
        reject(err)
        return err
      })
    })
  }

  get<T = any> (config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any> (config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any> (config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any> (config: ZTRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZTRequest
