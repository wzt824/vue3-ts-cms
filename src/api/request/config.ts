/**
 * 环境配置
 * production  开发环境
 * test        测试环境
 * development 生产环境
 */
let BASE_URL = ''
const TMIE_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://www.eleven824.top/prod'
} else {
  BASE_URL = 'http://www.eleven824.top/test'
}

export { BASE_URL, TMIE_OUT }
