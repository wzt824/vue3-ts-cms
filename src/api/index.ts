// 统一出口
import ZTRequest from './request'
import { BASE_URL, TMIE_OUT } from './request/config'
import localCache from '@/utils/cache'

const ztRequest = new ZTRequest({
  baseURL: BASE_URL,
  timeout: TMIE_OUT,
  interceptors: {
    requestInterceptor: (res) => {
      // token 的拦截
      const token = localCache.getCache('token')
      if (token) {
        res.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求成功的拦截', res)
      return res
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default ztRequest
