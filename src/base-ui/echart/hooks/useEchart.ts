import * as echarts from 'echarts'

// 导入地图数据
// import chinaMapData from '../data/china.json'
const chinaMapData = require('../data/china.json')
echarts.registerMap('china', chinaMapData)

export default function(el: HTMLElement) {
  // 1.创建echarts实例
  const echartInstance = echarts.init(el)
  // 2.设置options
  const setOptions = (options: echarts.EChartsOption) => {
    // 3.使用刚指定的配置项和数据显示图表。
    echartInstance.setOption(options)
  }

  // 手动更改
  const updateResize = () => {
    echartInstance.resize()
  }

  // 根据浏览器窗口调整echarts的宽度
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  // 4. 导出(对象类型可以随便获取，而元组类型需要一一对应)
  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
