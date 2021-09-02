// countUpjs 的配置文件
import type { CountUpOptions } from 'countup.js'

const defaultConfigOptions: CountUpOptions = {
  decimalPlaces: 2, // 保留两位小数
  duration: 2, // 动画时长(s)
  separator: ',', // 千分位的分隔符
  decimal: '.', // 小数位的分隔符
  prefix: '￥' // 单位
}

export {
  CountUpOptions,
  defaultConfigOptions
}
